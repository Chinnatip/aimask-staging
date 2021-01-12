import Layout from '@/layout/Layout'
import initialize from 'utils/initialize'
import GoogleMapReact from 'google-map-react'
import { bangkokMap, localeStyle } from '../components/static/bangkokLine'
// import { randomMarker } from '../components/static/markerDot'
import { destination_list } from '@/static/kohlife_destination'
import { trip_match } from '@/static/kohlife_trip_match'
import { array } from '@/static/trip_array'
import { Token } from 'interfaces'
// import { useState } from 'react'

type Props = {
  token?: Token
}


const randomMarker = [
  { latitude: 100.4408318522469, longitude: 13.58106172879 },
  { latitude: 100.42589479393, longitude: .59099715253 },
  { latitude: 100.4456424255246, longitude: 13.61407409556 },
  { latitude: 100.4947892470575, longitude: 13.60227463542 },
  { latitude: 100.4946513644548, longitude: 13.62035817091 },
  { latitude: 100.5075370874677, longitude: 13.62411360242 },
  { latitude: 100.3857803002297, longitude: 13.60028898865 },
  { latitude: 100.3950312997832, longitude: 13.58411489476 },
  { latitude: 100.3943143466345, longitude: 13.63775844892 },
  { latitude: 100.3662554060975, longitude: 13.65400458770 },
  { latitude: 100.3720280496038, longitude: 13.70239010002 },
  { latitude: 100.3661752280028, longitude: 13.74405731446 },
  { latitude: 100.4242177540197, longitude: 13.67979132113 },
  { latitude: 100.4028281174034, longitude: 13.67977200270 },
  { latitude: 100.4056786750294, longitude: 13.71061240636 },
  { latitude: 100.4432153778742, longitude: 13.72136275349 },
  { latitude: 100.4370903698208, longitude: 13.74537356404 },
  { latitude: 100.4825957947665, longitude: 13.74856004830 },
  { latitude: 100.4827631587553, longitude: 13.72959184368 },
  { latitude: 100.4959662655352, longitude: 13.70311173552 },
  { latitude: 100.4688113517727, longitude: 13.69302665932 },
  { latitude: 100.4773916078938, longitude: 13.67543530551 },
  { latitude: 100.508500142581, longitude: 3.67231548558 },
  { latitude: 100.5199994697746, longitude: 13.69745754712 },
  { latitude: 100.5140655909024, longitude: 13.71256921733 },
  { latitude: 100.5204394392517, longitude: 13.73023754390 },
  { latitude: 100.5262350258197, longitude: 13.73845311843 },
  { latitude: 100.5171234163431, longitude: 13.74034735930 },
  { latitude: 100.5170851125827, longitude: 13.74603981791 },
  { latitude: 100.512475683941, longitude: 3.75426761862 },
  { latitude: 100.5228766424857, longitude: 13.75553659360 },
  { latitude: 100.5378464135394, longitude: 13.75427254845 },
  { latitude: 100.5554280763296, longitude: 13.74921207514 },
  { latitude: 100.5554697236407, longitude: 13.73972430206 },
  { latitude: 100.5398688019675, longitude: 13.74098487607 },
  { latitude: 100.5392800702544, longitude: 13.72961096029 },
  { latitude: 100.5509751538904, longitude: 13.72835103591 },
  { latitude: 100.564603831291, longitude: 3.72961776625 },
  { latitude: 100.5651714290993, longitude: 13.75111359345 },
  { latitude: 100.5768247201807, longitude: 13.76695545146 },
  { latitude: 100.578722329534, longitude: 3.78536481040 },
  { latitude: 100.5577915491132, longitude: 13.80634567494 },
  { latitude: 100.547278832089, longitude: 3.81658042866 },
  { latitude: 100.5628824461623, longitude: 13.83508666894 },
  { latitude: 100.5595672352263, longitude: 13.84596359471 },
  { latitude: 100.5628129386574, longitude: 13.85616905553 },
  { latitude: 100.5816997052071, longitude: 13.88379915418 },
  { latitude: 100.599417008943, longitude: 3.87478362248 },
  { latitude: 100.5935766130224, longitude: 13.84406271577 },
  { latitude: 100.6086888747009, longitude: 13.78664033562 },
  { latitude: 100.6282364758597, longitude: 13.82486991503 },
  { latitude: 100.6510784434468, longitude: 13.81211659339 },
  { latitude: 100.6438572684865, longitude: 13.76887785137 },
  { latitude: 100.6581932945939, longitude: 13.77586302676 },
  { latitude: 100.6464363559021, longitude: 13.74985736127 },
  { latitude: 100.6067808650308, longitude: 13.74985499012 },
  { latitude: 100.5963736559987, longitude: 13.75301894582 },
  { latitude: 100.5918415361336, longitude: 13.74415885378 },
  { latitude: 100.6009445477696, longitude: 13.74099811298 },
  { latitude: 100.5944982449696, longitude: 13.71574249969 },
  { latitude: 100.5847913103182, longitude: 13.70628931007 },
  { latitude: 100.6088090720642, longitude: 13.67987888740 },
  { latitude: 100.6670727960853, longitude: 13.67924846378 },
  { latitude: 100.674265980964, longitude: 3.70377158645 },
  { latitude: 100.696958510807, longitude: 3.70376623985 },
  { latitude: 100.7009435454294, longitude: 13.72772108554 },
  { latitude: 100.7010775858134, longitude: 13.75239663112 },
  { latitude: 100.7056821910047, longitude: 13.77074446796 },
  { latitude: 100.6914986345157, longitude: 13.79937901202 },
  { latitude: 100.735929411563, longitude: 3.81589981389 },
  { latitude: 100.7222682528909, longitude: 13.81849707091 },
  { latitude: 100.7211984377546, longitude: 13.85943370882 },
  { latitude: 100.6635496750334, longitude: 13.84848995348 },
  { latitude: 100.6275833639842, longitude: 13.85364371404 },
  { latitude: 100.6118757258468, longitude: 13.86194617282 },
  { latitude: 100.6079617395249, longitude: 13.84725262325 },
  { latitude: 100.5694545900099, longitude: 13.82676651079 },
  { latitude: 100.6236455140654, longitude: 13.90439507165 },
  { latitude: 100.6380954416232, longitude: 13.92244225200 },
  { latitude: 100.6794719504875, longitude: 13.91791766245 },
  { latitude: 100.6636813190718, longitude: 13.90630637574 },
  { latitude: 100.6485458636835, longitude: 13.87479732101 },
  { latitude: 100.7522644419877, longitude: 13.81717575258 },
  { latitude: 100.8383606861481, longitude: 13.80505306509 },
  { latitude: 100.7940577399108, longitude: 13.75044983416 },
  { latitude: 100.7452958717338, longitude: 13.75489918334 },
  { latitude: 100.7581331722791, longitude: 13.73275572106 }
]


type MarkerProps = {
  stage: string
  // text: string
  // seed_key: string
  lat: number
  lng: number
  // hover: string[]
}

let translate_trip: any[] = []
let path_list: any[] = []

const des_key = Object.keys(trip_match)

const centerOfMap = destination_list.find(
  ({ seed_key }) => seed_key == 'bangkok'
)

const translate = (key: string) => {
  const i = destination_list.find((des) => des.seed_key == key)
  return {
    lat: i != undefined ? i.latitude : 13.7563309,
    lng: i != undefined ? i.longitude : 100.5017651,
  }
}

// Get Deatination key match
des_key.map((departure) => {
  const matcher: any = trip_match
  const binding: string[] = matcher[departure]
  return binding.map((arrival) => {
    translate_trip.push({ departure: departure, arrival: arrival })
  })
})

// Draw poly line
array.map((trip) => {
  path_list.push(translate(trip))
})

// Country Marker
// const CountryMarker = (props: MarkerProps) => {
//   const { text, seed_key, hover } = props
//   const check = hover.includes(seed_key)
//   return (
//     <div
//       className={`${
//         check ? 'bg-yellow-500 text-gray-800' : 'bg-gray-800 text-yellow-500'
//       }  capitalize inline-block rounded-full flex items-center justify-center`}
//       style={{
//         fontSize: '8px',
//         transform: 'translate(-50%, -50%)',
//         padding: '0px 6px',
//         width: 'max-content',
//         height: '16px',
//       }}
//     >
//       {text}
//     </div>
//   )
// }

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

const IndexPage = ({ token }: Props) => {
  // const [activeRoute] = useState<string[]>([])

  return (
    <Layout current="home" title="COVID - Map" token={token}>
      <main className="px-0 mb-0">
        <div className="w-full flex">
          <div className="flex-grow" style={{ height: '100vh' }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc',
              }}
              options={{
                styles: localeStyle
              }}
              defaultCenter={{
                lat: centerOfMap != undefined ? centerOfMap.latitude : 13,
                lng: centerOfMap != undefined ? centerOfMap.longitude : 100,
              }}
              defaultZoom={11}
              onGoogleApiLoaded={handleGoogleMapApi}
            >
              {randomMarker.map((destination) => {
                const { latitude, longitude } = destination
                return (
                  <Marker stage="orange"
                  lat={latitude}
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

export async function getServerSideProps(context: any) {
  const token = initialize(context)
  return {
    props: { token },
  }
}

export default IndexPage
