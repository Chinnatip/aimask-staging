import { Observes, Cameras, MaskType, CameraDetail } from '../../interfaces/marker'

export const find_mask = (percentage: number) => {
  if( percentage > 94.999 ){ return 'm_green' }
    else if( percentage > 90 ){ return 'm_yellow' }
    else{ return 'm_red' }
}


// Export camera-details method
export const camDetails = (observer: Observes, cameras: Cameras, select='ล่าสุด', timeIs='เช้า'): CameraDetail[] => {
  let response: CameraDetail[] = []
  const observer_list = Object.keys(cameras)
  observer_list.map(key => {
    if(observer[key] != undefined){
      const { location, latitude, longitude, district, sub_district, province } = cameras[key]
      const date_keys = Object.keys(observer[key].collection)
      const trigger_date = (select: string ) => date_keys.filter(date => {
        return date.substr(0,8) == select &&
          observer[key]
            .collection[date]
            .timeRange == timeIs
      })
      const pickSelect = select == 'ล่าสุด' ? ( Math.max( ...date_keys.map(key => parseInt(key)))).toString().substr(0,8) : select
      const pick_day = trigger_date(pickSelect)[0]
      try{
        const { gpu_process_time_gmt,timeRange, time, date, result } = observer[key].collection[pick_day]
        response.push({
          name: location,
          latitude,
          longitude,
          collection_date: pick_day.toString(),
          detect_timestamp: gpu_process_time_gmt.toString(),
          province_name: province,
          district_name: district,
          subdistrict_name: sub_district,
          timeRange, time, date,
          result
        })
      }catch(err){
        // console.log(err)
      }
    }
  })
  return response

}


export const findCenter = () => {
  // const count = markers.length
  const coordLAT = 13.7037576 + 0.11 //markers.reduce((sum, marker) => { return sum + marker.latitude}, 0)/count
  const coordLNG = 100.50617431875 - 0.07 //markers.reduce((sum, marker) => { return sum + marker.longitude}, 0)/count
  return [coordLAT, coordLNG]
}

export const maskCounting = (markers: CameraDetail[]) => {
  let response: MaskType = {
    green: 0,
    yellow: 0,
    red: 0
  }
  markers.map(mark => {
    const type = find_mask(mark.result.percentage)
    switch(type){
      case 'm_green': response.green += 1 ; break;
      case 'm_yellow': response.yellow += 1 ; break;
      case 'm_red': response.red += 1 ; break;
      default: ;
    }
  })
  return response
}
