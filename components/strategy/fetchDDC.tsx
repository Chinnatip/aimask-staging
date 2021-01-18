import axios from "axios"
import firebase from "./firebase"
import { CameraDetail, Observation, MaskType } from "../../interfaces/marker"
import { maskCounting, camDetails } from "../../components/strategy/marker"

const covidToday = async () => {
  try {
    const res = await axios.get("https://covid19.th-stat.com/api/open/today")
    const { data } = res
    return data
  } catch (err) {
    throw err
  }
}

const formatTimeline = (
  data,
  maskByDate,
  start_date: number,
  end_date: number
) => {
  const Data = data.Data
  const timeline = [
    {
      id: "อัตราการใส่หน้ากาก",
      color: "hsl(13, 70%, 50%)",
      data: [],
    },
    {
      id: "จำนวนผู้ติดเชื้อ",
      color: "hsl(81, 70%, 50%)",
      data: [],
    },
  ]
  Data.filter((d) => {
    const timeStamp = new Date(d.Date).getTime()
    return timeStamp >= start_date && timeStamp <= end_date
  }).map((d) => {
    const newConfirmed = d.NewConfirmed
    const { no_correct_wear_mask, total } = maskByDate[
      d.Date.replace(/^0+/, "")
    ]
    timeline[0].data.push({
      x: d.Date,
      y: (no_correct_wear_mask / total) * 100,
    })
    timeline[1].data.push({
      x: d.Date,
      y: newConfirmed,
    })
  })
  return timeline
}

const fetchFirebase = async () => {
  const cameras = await firebase
    .firestore()
    .collection("hours")
    .get()
    .then((res) => {
      const parcel: any = res.docs.map((item) => item.data())
      const cameras: Observation[] = parcel
      return cameras
    })
  return cameras
}

const covidTimeline = async (collections) => {
  try {
    interface maskByDateInterface {
      [key: string]: {
        no_correct_wear_mask: number
        no_incorrect_wear_mask: number
        no_not_wear_mask: number
        total: number
      }
    }
    let maskByDate: maskByDateInterface = {}
    let start_date = 2e18
    let end_date = -1
    for (let idx in collections) {
      for (let day in collections[idx]) {
        const { record_start_date_gmt, result } = collections[idx][day]
        start_date = Math.min(record_start_date_gmt * 1000, start_date)
        end_date = Math.max(record_start_date_gmt * 1000, end_date)
        const date = new Date(record_start_date_gmt * 1000).toLocaleDateString()
        if (!maskByDate[date]) {
          maskByDate[date] = {
            no_correct_wear_mask: result.no_correct_wear_mask,
            no_incorrect_wear_mask: result.no_incorrect_wear_mask,
            no_not_wear_mask: result.no_not_wear_mask,
            total: result.total,
          }
        } else {
          maskByDate[date]["no_correct_wear_mask"] +=
            result.no_correct_wear_mask
          maskByDate[date]["no_incorrect_wear_mask"] +=
            result.no_incorrect_wear_mask
          maskByDate[date]["no_not_wear_mask"] += result.no_not_wear_mask
          maskByDate[date]["total"] += result.total
        }
      }
    }
    const endDataString = new Date(end_date).toLocaleDateString()
    const mask_today = maskByDate[endDataString]
    const maskTodaySummary = {
      no_correct_wear_mask: mask_today["no_correct_wear_mask"],
      no_incorrect_wear_mask: mask_today["no_incorrect_wear_mask"],
      no_not_wear_mask: mask_today["no_not_wear_mask"],
      no_correct_wear_mask_pct:
        (mask_today["no_correct_wear_mask"] / mask_today["total"]) * 100,
      no_incorrect_wear_mask_pct:
        (mask_today["no_incorrect_wear_mask"] / mask_today["total"]) * 100,
      no_not_wear_mask_pct:
        (mask_today["no_not_wear_mask"] / mask_today["total"]) * 100,
    }
    const res = await axios.get("https://covid19.th-stat.com/api/open/timeline")
    const { data } = res
    return {
      timeline: formatTimeline(data, maskByDate, start_date, end_date),
      maskTodaySummary,
    }
  } catch (err) {
    throw err
  }
}

export const fetchDashboard = async () => {
  try {
    const cameras = await fetchFirebase()
    const collections = cameras.map((camera) => camera.collection)
    const markers: CameraDetail[] = camDetails(cameras)
    const maskCounter: MaskType = maskCounting(markers)
    const today = await covidToday()
    const { timeline, maskTodaySummary } = await covidTimeline(collections)
    return { today, timeline, maskCounter, maskTodaySummary }
  } catch (err) {
    throw err
  }
}
