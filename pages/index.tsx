import Layout from '@/layout/Layout'
import GoogleMapReact from 'google-map-react'
import Drawer from '../components/stuff/Drawer'
import firebase from '../components/strategy/firebase'
import { bangkokMap, localeStyle, darkTheme } from '../components/static/bangkokLine'
import { useState } from 'react'
import { CameraDetail, Observation, MaskType } from '../interfaces/marker'
import { Marker }  from '../components/stuff/Marker'
import { GridMask } from '../components/stuff/GridMask'
import { useMachine } from '@xstate/react'
import { useContent } from '../store/machine'
import { maskCounting, findCenter, camDetails } from '../components/strategy/marker'
import { faSun, faEye } from '@fortawesome/free-solid-svg-icons'
import Icon from '../components/stuff/Icon'

let stateParser

const handleGoogleMapApi = (google: any) => {
  var flightPath = new google.maps.Polyline({
    path: bangkokMap,
    geodesic: true,
    strokeColor: '#099669',
    strokeOpacity: 0.8,
    strokeWeight: 3
  })
  flightPath.setMap(google.map)
}

const Content = ({setMark, mapStyle}: {setMark: any , mapStyle: any}) => {
  const keyString: string = 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc'
  const [popNow, setPop] = useState("แนวถนนพระราม4-2")
  const [center, setCenter] = useState([13, 100])
  const [pick, setPick] = useState(false)
  const [current] = useMachine(useContent, {
    services: {
      fetchData: () =>
      firebase.firestore().collection('hours').get().then(res => {
        const parcel: any = res.docs.map(item => item.data())
        const cameras: Observation[] = parcel
        const district_lists: string[] = [ ...new Set(cameras.map(cam => cam.district_name))].sort()
        const markers: CameraDetail[] = camDetails(cameras).filter( camera => camera.result.total > 49 )
        // const district_score = district_lists.map(district => {
        //   const filter_cam = markers.filter(marker => marker.district_name == district)
        //   const cam_count = filter_cam.length
        //   const filter_cam_score = (filter_cam.map(cam => cam.result.percentage).reduce( (sum, cam) => { return sum + cam },0 ))/cam_count
        //   return {
        //     name: district,
        //     score: filter_cam_score
        //   }
        // })
        const maskCounter: MaskType = maskCounting(markers)
        setCenter(findCenter(markers))
        setMark(maskCounter)
        return { markers, district_lists, maskCounter }
      })
    },
  })
  switch (current.value) {
    case 'idle': return <h1>Blank</h1>
    case 'loading': return <h1>Loading</h1>
    case 'success': stateParser = current.context.data;
      const { markers, maskCounter } = stateParser
      const cameraPoints : CameraDetail[] = markers
      const maskType: MaskType = maskCounter
      return (
        <>
          <div className="grid grid-cols-3 px-5 gap-2 lg:hidden mt-20 h-16 z-10 bg-white w-full">
            <GridMask color="green-600" amount={maskType.green} criteria="95%-100%" image="m_green"  />
            <GridMask color="yellow-600" amount={maskType.yellow} criteria="90%-95%" image="m_yellow"  />
            <GridMask color="red-600" amount={maskType.red} criteria="ต่ำกว่า 90%" image="m_red"  />
          </div>
          <Drawer markers={markers} action={setPop} actionCenter={setCenter} actionStatus={setPick} pop={popNow} />
          <GoogleMapReact
            bootstrapURLKeys={{ key: keyString}}
            options={{ styles: mapStyle , minZoom: 5 }}
            defaultCenter={{ lat: center[0], lng: center[1] }}
            center={{ lat: center[0], lng: center[1] }}
            defaultZoom={12}
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {cameraPoints.map((data, index) => {
              const { latitude , longitude } = data
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
      )
    case 'failure': return <h1>Reload</h1>
    default: return null
  }
}

const IndexPage = () => {
  const [maskType, setMaskType] = useState<MaskType>({red: 0, green: 0, yellow: 0})
  const [mapStyle, setMapStyle] = useState<any>(localeStyle)
  return (
    <>
      <Layout current="home" maskType={maskType} title="DeepCare - Covid Map">
        <>
          <div className="flex flex-col w-full h-full relative">
            <button onClick={() => mapStyle == localeStyle ? setMapStyle(darkTheme) : setMapStyle(localeStyle)}
              className="flex px-2 py-1 absolute top-0 right-0 z-10 mt-24 mr-6 bg-white rounded-full shadow-xl"
              style={{width: '4.4rem'}}>
              { mapStyle == darkTheme && <div className="h-6 w-6 flex items-center justify-center text-gray-400 mr-auto">
                <Icon fill={faSun} noMargin></Icon>
              </div>}
              <div className={`${mapStyle == darkTheme && 'ml-auto'} text-white h-6 flex items-center justify-center w-6 bg-blue-500 rounded-full`}>
                <Icon fill={mapStyle == localeStyle ? faSun : faEye} noMargin></Icon>
              </div>
              { mapStyle == localeStyle && <div className="h-6 w-6 flex items-center justify-center text-gray-400 ml-auto">
                <Icon fill={faEye} noMargin></Icon>
              </div>}
            </button>
            <Content setMark={setMaskType} mapStyle={mapStyle} />
            <div className="block banner-bottom-height z-10 bg-white w-full"></div>
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



