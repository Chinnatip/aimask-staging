import Layout from '@/layout/Layout'
import GoogleMapReact from 'google-map-react'
import Drawer from '../components/stuff/Drawer'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
import { useState } from 'react'
import { CameraDetail } from '../interfaces/marker'
import { observationPoint, camDetails } from '../components/static/dataPoint'
import { Marker }  from '../components/stuff/Marker'

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
  const markers: CameraDetail[] = camDetails(observationPoint)
  const [popNow, setPop] = useState("ตลาดทุ่งครุ")
  const [center, setCenter] = useState([13.713394,100.453041])
  const [pick, setPick] = useState(false)
  const keyString: string = 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc'
  return (
    <>
      <Layout current="home" title="DeepCare - Covid Map" markers={markers}>
        <>
          <div className="flex flex-col w-full h-full">
            <div className="block lg:hidden mt-20 h-16 z-10 bg-white w-full"></div>
            <Drawer markers={markers} action={setPop} actionCenter={setCenter} actionStatus={setPick} pop={popNow} />
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
          <div className="block lg:hidden h-16 z-10 bg-white w-full"></div>
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

export default IndexPage
