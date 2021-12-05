import { MarkerType, DohMarkerType } from '../strategy/daily'

export const mainData = (markers: MarkerType[]) => {
  const correct = markers.map(a => a.ใส่หน้ากาก ).reduce((a,b) => a+b ,0)
  const in_correct = markers.map(a => a.ใส่ไม่ถูกต้อง).reduce((a,b) => a+b ,0)
  const no_mask = markers.map(a =>a.ไม่ใส่หน้ากาก ).reduce((a,b) => a+b ,0)
  const total = correct + in_correct + no_mask
  const brief = (float: number) => {
    return  Math.round(float * 10000) / 100
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
  const correct_percent = brief( correct/total )
  const in_correct_percent = brief( in_correct/total )
  return {
    report_period: '1 - 22 เมย. 2564',
    daily_report: '27 เมย. 2564',
    previous_period: '25 - 31 มีค. 2564',
    result: {
      total,
      correct_percent,
      in_correct_percent,
      no_mask_percent: Math.round((  100 - (correct_percent + in_correct_percent)) * 100) / 100 ,
      district: district_lists.length,
      camera: camera_lists.length
    },
    sort_district:{
      red:  sort.filter(district => district.value <= 90).map(row => row.district),
      yellow: sort.filter(district => district.value <= 95 && district.value > 90).map(row => row.district)
    }
  }
}

export const tcelData = (markers: MarkerType[]) => {
  const correct = markers.map(a => a.ใส่หน้ากาก ).reduce((a,b) => a+b ,0)
  const in_correct = markers.map(a => a.ใส่ไม่ถูกต้อง).reduce((a,b) => a+b ,0)
  const no_mask = markers.map(a =>a.ไม่ใส่หน้ากาก ).reduce((a,b) => a+b ,0)
  const total = correct + in_correct + no_mask
  const brief = (float: number) => {
    return  Math.round(float * 10000) / 100
  }
  const camera_lists = markers.map(mark => mark['จุดตั้งกล้อง'])
  const district_lists = [...new Set(camera_lists)]
  const sort = district_lists.map(district => {
    const filter = markers.filter(marker => marker['จุดตั้งกล้อง'] == district).map(marker => {
      return marker['ใส่หน้ากาก'] / (marker['ใส่หน้ากาก'] + marker['ใส่ไม่ถูกต้อง'] + marker['ไม่ใส่หน้ากาก'])
    })
    const average = filter.reduce((a,b) => a + b, 0) / filter.length
    return {
      district,
      value: Math.floor( average * 1000)/10
    }
  })
  const correct_percent = brief( correct/total )
  const in_correct_percent = brief( in_correct/total )
  return {
    report_period: '1 - 22 เมย. 2564',
    daily_report: '27 เมย. 2564',
    previous_period: '25 - 31 มีค. 2564',
    result: {
      total,
      correct_percent,
      in_correct_percent,
      no_mask_percent: Math.round((  100 - (correct_percent + in_correct_percent)) * 100) / 100 ,
      district: district_lists.length,
      camera: camera_lists.length
    },
    sort_district:{
      red:  sort.filter(district => district.value <= 90).map(row => row.district),
      yellow: sort.filter(district => district.value <= 95 && district.value > 90).map(row => row.district)
    }
  }
}

export const dohMainData = (markers: DohMarkerType[]) => {
  const correct = markers.map(a => a.ใส่หน้ากาก ).reduce((a,b) => a+b ,0)
  const in_correct = markers.map(a => a.ใส่ไม่ถูกต้อง).reduce((a,b) => a+b ,0)
  const no_mask = markers.map(a =>a.ไม่ใส่หน้ากาก ).reduce((a,b) => a+b ,0)
  const total = correct + in_correct + no_mask
  const brief = (float: number) => {
    return  Math.round(float * 10000) / 100
  }
  const camera_lists = markers.map(mark => mark['จังหวัด'])
  const district_lists = [...new Set(camera_lists)]
  const sort = district_lists.map(district => {
    const filter = markers.filter(marker => marker['จังหวัด'] == district).map(marker => {
      return marker['ใส่หน้ากาก'] / (marker['ใส่หน้ากาก'] + marker['ใส่ไม่ถูกต้อง'] + marker['ไม่ใส่หน้ากาก'])
    })
    const average = filter.reduce((a,b) => a + b, 0) / filter.length
    return {
      district,
      value: Math.floor( average * 1000)/10
    }
  })
  const correct_percent = brief( correct/total )
  const in_correct_percent = brief( in_correct/total )
  return {
    report_period: '1 - 22 เมย. 2564',
    daily_report: '27 เมย. 2564',
    previous_period: '25 - 31 มีค. 2564',
    result: {
      total,
      correct_percent,
      in_correct_percent,
      no_mask_percent: Math.round((  100 - (correct_percent + in_correct_percent)) * 100) / 100 ,
      district: district_lists.length,
      camera: camera_lists.length
    },
    sort_district:{
      red:  sort.filter(district => district.value <= 90).map(row => row.district),
      yellow: sort.filter(district => district.value <= 95 && district.value > 90).map(row => row.district)
    }
  }
}
