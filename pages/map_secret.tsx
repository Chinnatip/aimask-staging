import GoogleMapReact from 'google-map-react'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
import { useState } from 'react'
import { CameraDetail, MaskType, Observes, Cameras } from '../interfaces/marker'
import { BasicMark }  from '../components/stuff/Marker'
import { maskCounting, camDetails } from '../components/strategy/marker'
import {markerBKK} from '../components/static/markerBKK'

type KV = {
  key: number
  val: string
  date_string?: string
}

type SelectProps = {
  text: string
  mapStyle: any
  title: string
  action?: any
  varient: KV[]
  dataAction: any
  setCamera: any
  setMark: any
  observer: Observes
  cameras: Cameras
}

const handleGoogleMapApi = (google: any) => {
  var flightPath = new google.maps.Polyline({
    path: bangkokMap,
    geodesic: true,
    strokeColor: '#099669',
    strokeOpacity: 1,
    strokeWeight: 0,
    icons: [
      {
        icon: {
          path: "M 0,-1 0,1",
          strokeOpacity: 1,
          scale: 2,
        },
        offset: "0",
        repeat: "10px",
      },
    ],
  })
  flightPath.setMap(google.map)
}

export const SelectBox = (props: SelectProps) => {
  const { text, varient, mapStyle, title, action, dataAction, setMark, setCamera, cameras, observer } = props
  const [value, setValue] = useState(text)
  const [show, setShow] = useState(false)
  const cellCal = (num: number) => {
    const res = num == 2 ? 24 :
                num == 3 ? 40 :
                num == 4 ? 48 :
                num > 4 ? 96 : 96
    return res
  }
  const updateVal = (val: any, key: number) => {
    setValue(val)
    if(action != undefined){action(key)}
    const get_date = varient.find(v => v.key == key )
    const markers: CameraDetail[] = camDetails(observer, cameras, get_date?.date_string, mapStyle.title)
    const maskCounter: MaskType = maskCounting(markers)
    setMark(maskCounter)
    setCamera(markers)
    dataAction(get_date)
  }
  return <button className="appearance-none text-left focus:outline-none block w-full relative text-md" onClick={() => {setShow(!show)}}>
  <div className="flex items-center">
    <label className="block bg-gray-400 h-10 rounded-bl-full flex items-center justify-center rounded-tl-full text-gray-800 -mt-2 text-sm w-10"> {title} </label>
    <span className="block bg-white mb-2 bg-white rounded-br-full rounded-tr-full w-32 py-2 pl-3 leading-6 text-left">
      <span className={`${value != '-' ? 'text-black' : 'text-gray-500'}`}>{value}</span>
      <span className="mr-4 text-gray-600 pr-1">
      </span>
    </span>
  </div>

  { show && <div className={`h-${cellCal(varient.length)} overflow-y-auto appearance-none absolute z-10 -mt-1 bg-white border-2 shadow-xl border-gray-200 rounded-md w-full`} >
      <span className={`block py-2 border-b leading-8 text-left w-full`}>
        {varient.map(({ val,key },index) => <span
          key={index}
          onClick={() =>  updateVal(val, key)}
          className={`block py-2 ${index != varient.length - 1 && 'border-b'} pl-3 leading-6 text-left w-full`}>
          <span key={index} className=" text-gray-800">{val}</span>
        </span> )}
      </span>
  </div> }
</button>
}



const MapPage = () => {
  const [mapStyle] = useState<any>(localeStyle)
  const keyString: string = 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc'
  const [center] = useState([13.756457,100.515556])
  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="flex-grow relative">
          <GoogleMapReact
            bootstrapURLKeys={{ key: keyString}}
            options={{ styles: mapStyle.style , minZoom: 5 }}
            defaultCenter={{ lat: center[0], lng: center[1] }}
            center={{ lat: center[0], lng: center[1] }}
            defaultZoom={11}
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {markerBKK.map((data, index) => {
              const percentage = data["ใส่หน้ากาก%"] * 100
              const color = percentage >= 95 ? 'เขียว' :  percentage > 90 ? 'เหลือง' : 'แดง'
              if(color == 'เหลือง'){
                console.log( `${data['จุดตั้งกล้อง']} ${data['เขต']} | ${color} ${percentage}` )
              }
              return (
                <BasicMark
                  key={index}
                  percentage={data["ใส่หน้ากาก%"] * 100}
                  lat={data["latitude"]}
                  lng={data["longitude"]}/>
              )}
            )}
          </GoogleMapReact>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default MapPage
