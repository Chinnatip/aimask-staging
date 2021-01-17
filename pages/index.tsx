import Layout from '@/layout/Layout'
import GoogleMapReact from 'google-map-react'
import Drawer from '../components/stuff/Drawer'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
import { useState } from 'react'
import { MarkerProps, CameraDetail } from '../interfaces/marker'
import { observationPoint, camDetails } from '../components/static/dataPoint'

const Marker = (props: MarkerProps) => {
  const { data, pop, action, status, actionStatus, actionCenter } = props
  // const [ modal, setModal ] = useState(pop)
  const {
    result: { no_correct_wear_mask, no_incorrect_wear_mask, no_not_wear_mask ,total},
    detect_timestamp ,
    latitude,
    longitude
  } = data
  const calc = (num: number, total: number) => (num * 100 / total).toFixed(2)
  // console.log(data)
  return (
    <div className="text-b relative">
      { status && (pop == data.name) && <div className="z-10 text-b absolute p-4 bg-white -ml-40 rounded-lg shadow-xl" style={{ marginTop: '-26rem', width: '24rem', height: '25rem' }}>
        <div className="text-gray-700 text-lg underline relative">
          {data.name}, กรุงเทพ
          <button onClick={() => actionStatus(!status)} className="bg-gray-300 h-8 w-8 rounded-full absolute top-0 right-0">X</button>
        </div>
        <div className='text-sm text-gray-500'>สำรวจรวม {total} ราย | อัพเดทวันที่ {detect_timestamp.split(' ')[0]}</div>
        <img src={`./label/${data.name}.png`} className="m-auto mt-2" style={{ width: '22rem' }} />
        <hr />
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
      <button onClick={() => { actionStatus(true); actionCenter([latitude,longitude]); action(data.name)}}>
        <img src="mask_icon/m_green.png" className="h-6 w-6 -mt-2 -ml-2 shadow-xl rounded-full border-2 border-green-700" alt=""/>
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

const toggleDrawer = () => {
  let Drawer = document.getElementById("Drawer");
  if (Drawer == null) return;
  if (Drawer.style.right != "100%") Drawer.style.right = "100%";
  else Drawer.style.right = (document.body.clientWidth - Drawer.offsetWidth).toString() + "px";
}

const IndexPage = () => {
  const markers: CameraDetail[] = camDetails(observationPoint)
  const [popNow, setPop] = useState("ตลาดทุ่งครุ")
  const [center, setCenter] = useState([13.713394,100.453041])
  const [pick, setPick] = useState(false)
  const keyString: string = 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc'
  return (
    <>
      <Layout current="home" title="DeepCare - Covid Map" markers={markers} actionDrawer={toggleDrawer}>
        <>
          <div className="fixed bottom-0 left-0 right-0 bg-white h-16 z-10" style={{ top: "4rem", bottom: "8rem" }}>
            <div className="flex flex-wrap text-white text-center w-full h-full">
            </div>
          </div>
          <Drawer markers={markers} action={setPop} actionDrawer={toggleDrawer} actionCenter={setCenter} actionStatus={setPick} pop={popNow} />
          <GoogleMapReact
            bootstrapURLKeys={{ key: keyString}}
            options={{ styles: localeStyle }}
            defaultCenter={{ lat: center[0], lng: center[1] }}
            center={{ lat: center[0], lng: center[1] }}
            defaultZoom={12}
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {markers.map((data, index) => {
              // console.log(popNow)
              const { latitude, longitude } = data
              return (
                <Marker
                  key={index}
                  data={data}
                  pop={popNow}
                  status={pick}
                  actionCenter={setCenter}
                  actionStatus={setPick}
                  lat={latitude}
                  lng={longitude}
                  action={setPop} />
              )}
            )}
          </GoogleMapReact>
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

export default IndexPage
