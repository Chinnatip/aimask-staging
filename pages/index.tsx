import Layout from '@/layout/Layout'
import GoogleMapReact  from 'google-map-react'
import Drawer from '../components/stuff/Drawer'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
import { useState } from 'react'
import { MarkerProps , MarkerProperty } from '../interfaces/marker'
import { currentMarkers } from '../components/static/point'

const Marker = (props: MarkerProps) => {
  const { data , pop, action } = props
  // const [ modal, setModal ] = useState(pop)
  const { no_correct_wear_mask, no_incorrect_wear_mask, no_not_wear_mask ,total, date } = data
  const calc = (num: number, total: number) => (num * 100 / total).toFixed(2)
  // console.log(data)
  return (
    <div className="relative">
      { (pop == data.name) && <div className="z-10 text-b absolute p-4 bg-white -ml-40 rounded-lg shadow-xl" style={{marginTop: '-26rem' , width: '24rem', height: '24rem'}}>
        <div className="text-gray-700 text-lg underline">{data.name}, กรุงเทพ</div>
        <div className='text-sm text-gray-500'>สำรวจรวม {total} ราย | อัพเดทวันที่ {date.split(' ')[0]}</div>
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
      <button onClick={() => action(data.name)}>
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

const IndexPage = () => {
  const parcel: any = currentMarkers
  const markers: MarkerProperty[] = parcel
  const [popNow, setPop] = useState("ตลาดทุ่งครุ")
  const keyString: string = 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc'
  return (
    <Layout current="home" title="DeepCare - Covid Map">
      <main className="px-0 mb-0">
        <div className="w-full flex">
          <div className="flex-grow" style={{ height: '100vh' }}>
        <>
          <Drawer markers={markers} action={setPop} pop={popNow} />
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
                console.log(popNow)
                const { latitude, longitude } = data
                return (
                  <Marker
                  key={index}
                  data={data}
                  pop={popNow}
                  lat={latitude}
                  lng={longitude}
                  action={setPop} />
                )
              })}
            </GoogleMapReact>
        </>
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
