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
  data: CameraDetail
  action?: any
  pop?: string
  status: boolean
  actionStatus?: any
}

interface Result {
  total: number
  no_correct_wear_mask: number
  no_incorrect_wear_mask: number
  no_not_wear_mask: number
  percentage: number
}

export interface Collection {
  [key: string]: {
    detect_timestamp: string
    time_start: string
    time_end: string
    result: Result
  }[]
}

interface Observer {
  name: string
  gpu_server: string
  latitude: number
  longitude: number
  collection: Collection
}

export interface Observation {
  [key: string]: Observer
}

export interface CameraDetail {
  name: string
  latitude: number
  longitude: number
  collection_date: string
  detect_timestamp: string
  result: Result
}
