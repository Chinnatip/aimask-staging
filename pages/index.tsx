import Layout from '@/layout/Layout'
import GoogleMapReact  from 'google-map-react'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
import Drawer from '../components/stuff/Drawer'
// import { randomMarker } from '../components/static/markerDot'
import { useMachine } from '@xstate/react'
import { useContent } from '../data/machine'
import { useState } from 'react'

interface Marker {
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

interface MarkerProps {
  stage: string
  lat: number
  lng: number
  data: Marker
  pop?: boolean
}

const Marker = (props: MarkerProps) => {
  const { data , pop=false } = props
  const [ modal, setModal ] = useState(pop)
  console.log(data)
  const { no_correct_wear_mask, no_incorrect_wear_mask, no_not_wear_mask ,total, date } = data
  const calc = (num: number, total: number) => (num * 100 / total).toFixed(2)
  return (
    <div className="relative">
      {/* <div className={`h-3 w-3 bg-${stage}-600 rounded-full shadow-lg`}/> */}
      { modal && <div className="z-10 text-b absolute p-4 bg-white -ml-40 rounded-lg shadow-xl" style={{marginTop: '-26rem' , width: '24rem', height: '24rem'}}>
        <div className="text-gray-700 text-lg underline">{data.name}, กรุงเทพ</div>
        <div className='text-sm text-gray-500'>สำรวจรวม {total} ราย อัพเดท: {date}</div>
        <img src="mock_graph.png" className="m-auto h-40"/>
        <hr/>
        <div className="mt-4 text-xs grid text-gray-700 grid-flow-row grid-cols-3 grid-rows-3 gap-4">
          <div className="text-center"></div>
          <div className="text-center">จำนวนคน</div>
          <div className="text-center">สัดส่วน</div>
          <div className="text-center">ใส่หน้ากากถูกต้อง</div>
          <div className="text-center text-green-600">{no_correct_wear_mask}</div>
          <div className="text-center text-green-600">{calc(no_correct_wear_mask, total)}%</div>
          <div className="text-center">ใส่หน้ากากไม่ถูกต้อง</div>
          <div className="text-center text-yellow-600">{no_incorrect_wear_mask}</div>
          <div className="text-center text-yellow-600">{calc(no_incorrect_wear_mask, total)}%</div>
          <div className="text-center">ไม่ใส่หน้ากาก</div>
          <div className="text-center text-red-600">{no_not_wear_mask}</div>
          <div className="text-center text-red-600">{calc(no_not_wear_mask, total)}%</div>
        </div>
      </div>}
      <button onClick={() => setModal(!modal)}>
        <img src="mask_icon/m_green.png" className="h-12 w-12 -mt-2 -ml-2 shadow-xl rounded-full border-4 border-green-700" alt=""/>
      </button>
    </div>
  )
}

const handleGoogleMapApi = (google: any) => {
  var flightPath = new google.maps.Polyline({
    path: bangkokMap,
    geodesic: true,
    strokeColor: '#099669',
    strokeOpacity: 1,
    strokeWeight: 8,
  })
  flightPath.setMap(google.map)
}

const Content = () => {
  const database_path = 'https://deepcare.s3-ap-southeast-1.amazonaws.com/result.json'
  const [current] = useMachine(useContent, {
    services: {
      fetchData: () =>
      fetch(database_path)
            .then(response => response.json())
            .then((jsonData) => {
              console.log(jsonData)
              const markers : Marker[] = jsonData
              return { markers }
        }),
    },
  })
  switch (current.value) {
    case 'idle': return <h1>Blank</h1>
    case 'loading': return <h1>Loading ...</h1>
    case 'success':
      const data: any = current.context.data
      const markers: Marker[] = data.markers
      const keyString: string = 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc'
      return (
        <>
          {/* {JSON.stringify(markers)} */}
          <GoogleMapReact
              bootstrapURLKeys={{ key: keyString}}
              options={{
                styles: localeStyle
              }}
              defaultCenter={{ lat: 13.746683,lng:  100.470739 }}
              defaultZoom={13}
              onGoogleApiLoaded={handleGoogleMapApi}
            >
              {markers.map((data, index) => {
                const { latitude, longitude } = data
                return (
                  <Marker
                  key={index}
                  data={data}
                  stage={'blue'}
                  pop={data.name == "ตลาดทุ่งครุ"}
                  lat={latitude}
                  lng={longitude} />
                )
              })}
            </GoogleMapReact>
        </>
      )
    case 'failure': return <h1>Reload</h1>
    default: return null
  }
}


const IndexPage = () => {
  // const [activeRoute] = useState<string[]>([])

  return (
    <Layout current="home" title="DeepCare - Covid Map">
      <main className="px-0 mb-0">
        <Drawer />
        <div className="w-full flex">
          <div className="flex-grow" style={{ height: '100vh' }}>
            <Content />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default IndexPage
