import Layout from '@/layout/Layout'
import GoogleMapReact  from 'google-map-react'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
import { randomMarker } from '../components/static/markerDot'

type MarkerProps = {
  stage: string
  lat: number
  lng: number
  // text: string
  // hover: string[]
}

const Marker = (props: MarkerProps) => {
  const { stage } = props
  return (
    <div className={`h-3 w-3 bg-${stage}-600 rounded-full shadow-lg`}/>
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
  // const [activeRoute] = useState<string[]>([])
  const keyString: string =  process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY == undefined ?'GOOGLE_ENV' : process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
  return (
    <Layout current="home" title="COVID - Map">
      <main className="px-0 mb-0">
        <div className="w-full flex">
          <div className="flex-grow" style={{ height: '100vh' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: keyString}}
              options={{
                styles: localeStyle
              }}
              defaultCenter={{ lat: 13.741785, lng: 100.546367 }}
              defaultZoom={11}
              onGoogleApiLoaded={handleGoogleMapApi}
            >
              {randomMarker.map((destination, index) => {
                const { lattitude, longitude } = destination
                return (
                  <Marker stage={index % 2 == 0 ? 'orange' : index % 3 == 0 ? 'blue' : 'green'}
                  lat={lattitude}
                  lng={longitude} />
                )
              })}
            </GoogleMapReact>
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
