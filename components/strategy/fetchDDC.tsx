import axios from "axios"

const covidToday = async () => {
  try {
    const res = await axios.get("https://covid19.th-stat.com/api/open/today")
    const { data } = res
    return data
  } catch (err) {
    throw err
  }
}

export const fetchDashboard = async () => {
  try {
    const today = await covidToday()
    return { today }
  } catch (err) {
    throw err
  }
}
