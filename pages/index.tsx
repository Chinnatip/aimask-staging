import Layout from '@/layout/Layout'
import initialize from 'utils/initialize'
import { Token } from 'interfaces'
import moment from 'moment'
import GoogleMapReact from 'google-map-react'

import { destination_list } from '@/static/kohlife_destination'
import { trip_match } from '@/static/kohlife_trip_match'
import { array } from '@/static/trip_array'
import { useState } from 'react'

type Props = {
  token?: Token
}

type MarkerProps = {
  text: string
  seed_key: string
  lat: number
  lng: number
  hover: string[]
}

let translate_trip: any[] = []
let path_list: any[] = []

const des_key = Object.keys(trip_match)

const initial_traveller = 2

const next_day_format = moment().add(1, 'day').format('YYYY-MM-DD')

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

const Marker = (props: MarkerProps) => {
  const { text, seed_key, hover } = props
  const check = hover.includes(seed_key)
  return (
    <div
      className={`${
        check ? 'bg-yellow-500 text-gray-800' : 'bg-gray-800 text-yellow-500'
      }  capitalize inline-block rounded-full flex items-center justify-center`}
      style={{
        fontSize: '8px',
        transform: 'translate(-50%, -50%)',
        padding: '0px 6px',
        width: 'max-content',
        height: '16px',
      }}
    >
      {text}
    </div>
  )
}

const handleGoogleMapApi = (google: any) => {
  var flightPath = new google.maps.Polyline({
    path: path_list,
    geodesic: true,
    strokeColor: '#2d3748',
    strokeOpacity: 1,
    strokeWeight: 1.5,
  })
  flightPath.setMap(google.map)
}

const IndexPage = ({ token }: Props) => {
  const [activeRoute, setRoute] = useState<string[]>([])

  return (
    <Layout current="home" title="KOHLIFE - Map" token={token}>
      <main className=" sm:px-8 sm:mb-6 px-0 mb-0">
        {/* <h1>{activeRoute}</h1> */}
        <div className="w-full flex">
          <div
            className="mr-2 sm:block hidden"
            style={{ maxHeight: '80vh', overflow: 'auto' }}
          >
            <p className="font-bold text-blue-600 underline">
              CURRENTLY : {translate_trip.length} ROUTES
            </p>
            {translate_trip.map(({ departure, arrival }, index) => (
              <a
                key={index}
                target="_blank"
                href={`https://www.kohlife.com/transport/${departure}/${arrival}/${next_day_format}/${initial_traveller}`}
                onMouseEnter={() => setRoute([arrival, departure])}
                onMouseLeave={() => setRoute([])}
                className="text-sm block my-1 text-blue-600 hover:underline"
              >
                {departure} - {arrival}
              </a>
            ))}
          </div>
          <div className="flex-grow" style={{ height: '80vh' }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyABQ_VlKDqdqHUcOKKRIkMvNljwWDUIzMc',
              }}
              defaultCenter={{
                lat: centerOfMap != undefined ? centerOfMap.latitude : 13,
                lng: centerOfMap != undefined ? centerOfMap.longitude : 100,
              }}
              defaultZoom={6}
              onGoogleApiLoaded={handleGoogleMapApi}
            >
              {destination_list.map((destination) => {
                const { latitude, longitude, name, seed_key } = destination
                return (
                  <Marker
                    lat={latitude}
                    lng={longitude}
                    text={name}
                    seed_key={seed_key}
                    hover={activeRoute}
                  />
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
