import GoogleMapReact from 'google-map-react'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
import { useState } from 'react'
import { BasicMark }  from '../components/stuff/Marker'
import {markerBKK} from '../components/static/markerBKK'

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

export const GooglemapComponent = () => {
  const [mapStyle] = useState<any>(localeStyle)
  const keyString: string = 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc'
  const [center] = useState([13.756457,100.515556])
  return <GoogleMapReact
    bootstrapURLKeys={{ key: keyString}}
    options={{ styles: mapStyle.style , minZoom: 5,scaleControl: false,scrollwheel: false,fullscreenControl: false,zoomControl: false,minZoomOverride: false }}
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

}

export const MapPage = () => {
  return (
    <>
      <div className="w-screen h-screen flex">
        <div className="flex-grow relative">
          <GooglemapComponent />
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
