export interface MarkerProperty {
  date: string
  gpu_server: string
  latitude: number
  longitude: number
  name: string
  date__1: number
  no_correct_wear_mask: number
  no_incorrect_wear_mask: number
  no_not_wear_mask: number
  percentage: number
  time_end: string
  time_start: string
  total: number
}

export interface MarkerProps {
  lat: number
  lng: number
  data: MarkerProperty
  action?: any
  pop?: string
  status: boolean
  actionStatus?: any
}
