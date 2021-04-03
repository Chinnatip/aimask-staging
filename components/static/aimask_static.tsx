type MarkerType = {
  "จุดตั้งกล้อง": string
  "เขต": string
  "lattitude": number
  "longitude": number
  "นับกล้องต่อหนึ่งสถานที่": number
  "ใส่หน้ากาก": number
  "ใส่ไม่ถูกต้อง": number
  "ไม่ใส่หน้ากาก": number
  "รวม": number
  "ใส่หน้ากาก%": number
  "ใส่ไม่ถูกต้อง%": number
  "ไม่ใส่หน้ากาก%": number
  "note": string
}

export const mainData = (markers: MarkerType[]) => {

  const correct = markers.map(a => a.ใส่หน้ากาก ).reduce((a,b) => a+b ,0)
  const in_correct = markers.map(a => a.ใส่ไม่ถูกต้อง).reduce((a,b) => a+b ,0)
  const no_mask = markers.map(a =>a.ไม่ใส่หน้ากาก ).reduce((a,b) => a+b ,0)
  const total = correct + in_correct + no_mask
  const brief = (float: number) => {
    return Math.floor( float * 1000)/10
  }
  const camera_lists = markers.map(mark => mark['เขต'])
  const district_lists = [...new Set(camera_lists)]
  const sort = district_lists.map(district => {
    const filter = markers.filter(marker => marker['เขต'] == district).map(marker => {
      return marker['ใส่หน้ากาก'] / (marker['ใส่หน้ากาก'] + marker['ใส่ไม่ถูกต้อง'] + marker['ไม่ใส่หน้ากาก'])
    })
    const average = filter.reduce((a,b) => a + b, 0) / filter.length
    return {
      district,
      value: Math.floor( average * 1000)/10
    }
  })
  return {
    report_period: '18 - 31 มีค. 2564',
    previous_period: '7 - 17 มีค. 2564',
    result: {
      total,
      correct_percent: brief( correct/total ),
      in_correct_percent: brief( in_correct/total ),
      no_mask_percent: brief( no_mask/total ),
      district: district_lists.length,
      camera: camera_lists.length
    },
    sort_district:{
      red:  sort.filter(district => district.value <= 90).map(row => row.district),
      yellow: sort.filter(district => district.value <= 95 && district.value > 90).map(row => row.district)
    }
  }
}
