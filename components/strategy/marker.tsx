import {Observation,MaskType, CameraDetail} from '../../interfaces/marker'

export const find_mask = (percentage: number) => {
  if( percentage > 94.999 ){ return 'm_green' }
    else if( percentage > 90 ){ return 'm_yellow' }
    else{ return 'm_red' }
}


// Export camera-details method
export const camDetails = (observer: Observation[],select='lastest'): CameraDetail[] => {
  let response: CameraDetail[] = []
  observer.map(observe => {
    const {
      camera_latitude, camera_longtitude, camera_name, collection,
      province_name, district_name, subdistrict_name
    } = observe
    const date_keys = Object.keys(collection)
    const pick_day = select == 'lastest' ? Math.max( ...date_keys.map(key => parseInt(key)) ) : date_keys.filter(date => date.substr(0,8) == select)[0]
    const selectCollection = collection[pick_day]
    if(selectCollection != undefined){
      const { gpu_process_time_gmt, result } = selectCollection
      response.push({
        name: camera_name,
        latitude: parseFloat( camera_latitude),
        longitude: parseFloat( camera_longtitude),
        collection_date: pick_day.toString(),
        detect_timestamp: gpu_process_time_gmt.toString(),
        province_name, district_name, subdistrict_name ,
        result
      })
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
