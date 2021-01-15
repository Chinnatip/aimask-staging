export interface MarkerProperty {
  date: string
  gpu_server: string
  latitude: number
  longitude: number
  name: string
  no_correct_wear_mask: number
  no_incorrect_wear_mask: number
  no_not_wear_mask: number
  percentage: number
  time_end: string
  time_start: string
  total: number
}

export interface MarkerProps {
  stage: string
  lat: number
  lng: number
  data: MarkerProperty
  pop?: boolean
}
