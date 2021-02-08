import Layout from '@/layout/Layout'
import GoogleMapReact from 'google-map-react'
import firebase from '../components/strategy/firebase'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
import { marker_fixed } from '../components/static/newMarker'
import { useState } from 'react'
import { CameraDetail, Observation, MaskType } from '../interfaces/marker'
import { Marker }  from '../components/stuff/Marker'
import { useMachine } from '@xstate/react'
import { useContent } from '../store/machine'
import { maskCounting, findCenter, camDetails } from '../components/strategy/marker'
import dayjs from 'dayjs'

let stateParser

type KV = {
  key: number
  val: string
  date_string?: string
}

type SelectProps = {
  text: string
  title: string
  action?: any
  varient: KV[]
  dataAction: any
  setCamera: any
  setMark: any
  cameras: Observation[]
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
  const { text, varient, title, action, dataAction, setMark, setCamera,cameras } = props
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
    // console.log(get_date?.date_string)
    const markers: CameraDetail[] = camDetails(cameras, get_date?.date_string)
    const maskCounter: MaskType = maskCounting(markers)
    setMark(maskCounter)
    setCamera(markers)

    dataAction(get_date?.val)
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

const processDate = (day: string) => {
  return dayjs(`${day.substr(2,2)}-${day.substr(0,2)}-${day.substr(4,4)}`, "MM-DD-YYYY").format('DD MMM YYYY')
}

const Content = ({setMark, mapStyle}: {setMark: any , mapStyle: any, setMapStyle: any}) => {
  const keyString: string = 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc'
  const [center, setCenter] = useState([13, 100])
  const [cameraPoints, setCameraPoint] = useState<CameraDetail[]>([])
  const [current] = useMachine(useContent, {
    services: {
      fetchData: () =>
      firebase.firestore().collection('hours').get().then(res => {
        let date_lists: string[] = []
        let date_use: KV[] = []
        const parcel: any = res.docs.map(item => item.data())
        const cameras: Observation[] = parcel
        const district_lists: string[] = [ ...new Set(cameras.map(cam => cam.district_name))].sort()
        //
        cameras.map(cam => Object.keys(cam.collection).map(day => date_lists.push( day.substr(0,8) )))
        const uniqueDate = [...new Set(date_lists)].sort((a,b) => { return parseInt(b)-parseInt(a)})
        uniqueDate.map((date,index) => {
          date_use.push({
            key: index + 1,
            val: processDate(date),
            date_string: date.substr(0,8)
          })
        })
        //
        const markers: CameraDetail[] = camDetails(cameras)
        const maskCounter: MaskType = maskCounting(markers)
        //
        setCenter(findCenter())
        setMark(maskCounter)
        console.log(markers)
        setCameraPoint(marker_fixed)
        return { cameras, markers, district_lists, maskCounter }
      })
    },
  })
  switch (current.value) {
    case 'idle': return <h1>Blank</h1>
    case 'loading': return <h1>Loading</h1>
    case 'success': stateParser = current.context.data;
      return (
        <div className="flex-grow relative">
          <GoogleMapReact
            bootstrapURLKeys={{ key: keyString}}
            options={{ styles: mapStyle , minZoom: 5 }}
            defaultCenter={{ lat: center[0], lng: center[1] }}
            center={{ lat: center[0], lng: center[1] }}
            defaultZoom={11}
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {cameraPoints.map((data, index) => {
              const { latitude , longitude, result: {percentage}}  = data
              return (
                <Marker
                  key={index}
                  percentage={percentage}
                  // data={data}
                  lat={latitude}
                  lng={longitude}
                  />
              )}
            )}
          </GoogleMapReact>
        </div>
      )
    case 'failure': return <h1>Reload</h1>
    default: return null
  }
}

const Notifier = () => {
  const lists = [
    {col: 'orange-800',text: ['ผู้สัญจรในที่สาธารณะ']},
    {col: 'blue-600',text: ['ความหนาแน่น ','13.84 คนต่อ 100 ตร.ม.']},
    {col: 'pink-600',text: ['อัตราการสวมหน้ากากอนามัย 95.55%']},
  ]
  return <div className="hidden lg:flex h-full bg-gray-800 flex-col pt-20 text-white text-xl" style={{width: '15rem'}}>
    {  lists.map(({col, text},index) => {
      return <div key={index} className={`flex-grow bg-${col} flex flex-col justify-center px-4`}>
        {text[0]}
        {text[1] && <div>{text[1]}</div>}
      </div>
    })}
    <div className={`flex-grow bg-gray-600 flex flex-col justify-center px-4`}>
        บริเวณที่คนหนาแน่นวันนี้
        <div className="text-gray-800">ป้ายรถอ่อนนุช, เยาวราช</div>
      </div>
  </div>
}

const MapPage = () => {
  const [maskType, setMaskType] = useState<MaskType>({red: 0, green: 0, yellow: 0})
  const [mapStyle, setMapStyle] = useState<any>(localeStyle)
  return (
    <>
      <Layout current="map" maskType={maskType} title="DeepCare - Covid Map">
        <>
          <div className="flex flex-col w-full h-full relative">
            <div className="w-full h-full flex">
              <Content setMark={setMaskType} mapStyle={mapStyle} setMapStyle={setMapStyle}/>
              {/* <Notifier /> */}
            </div>
            {/* <div className="block banner-bottom-height z-10 bg-white w-full"></div> */}
          </div>
        </>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default MapPage
