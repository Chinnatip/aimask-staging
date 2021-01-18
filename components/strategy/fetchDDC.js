import axios from "axios"
import firebase from "./firebase"
import { useMachine } from "@xstate/react"
import { useContent } from "../../store/machine"

export const covidToday = async () => {
  try {
    const res = await axios.get("https://covid19.th-stat.com/api/open/today")
    const { data } = res
    return data
  } catch (err) {
    throw err
  }
}

const formatTimeline = (data) => {
  const Data = data.Data
  const timeline = {
    timeline: Data.filter((d) => {
      const timeStamp = new Date(d.Date).getTime()
      return timeStamp >= new Date("01/12/2021").getTime()
    }).map((d) => {
      const newConfirmed = d.NewConfirmed
      const timeStamp = new Date(d.Date).getTime()
      return {
        date: d.Date,
        dateTimestamp: timeStamp,
        newConfirmed: newConfirmed,
        totalPTC: 100,
      }
    }),
  }
  return timeline
}

export const covidTimeline = async () => {
  try {
    const res = await axios.get("https://covid19.th-stat.com/api/open/timeline")
    const { data } = res
    return formatTimeline(data)
  } catch (err) {
    throw err
  }
}
