import Icon from '@/stuff/Icon'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

type Media = {
  url: string
  thumbnail: string
}

type Theme = {
  style: string
  color: string
}

type Props = {
  data: {
    name: string
    desc: string
    cost: number
    instructor: string
    location: string
    theme: Theme
    media: Media
  }
}

const filterTheme = (theme: string) => {
  switch (theme) {
    case 'soft-blue':
      return 'bg-blue-200'
    case 'soft-green':
      return 'bg-green-300'
    case 'soft-brown':
      return 'bg-orange-500'
    case 'brown':
      return 'bg-brown'
    case 'focus-orange':
      return 'bg-orange-600'
    case 'focus-red':
      return 'bg-red-700'
    case 'dark-gray':
      return 'bg-dark-gray'
    case 'black-pink':
      return 'bg-pink-600'
    case 'light-yellow':
      return 'bg-yellow-300'
    case 'primary':
      return 'bg-green-800'
    default:
      return 'bg-gray-300'
  }
}

const filterText = (theme: string) => {
  return theme == 'light' ? 'text-gray-700' : 'text-white'
}

const Card = ({ data }: Props) => {
  const {
    theme: { style, color },
    media: { url, thumbnail },
    name,
    desc,
    cost,
    location,
    instructor,
  } = data
  return (
    <div
      className={`h-40 rounded-lg overflow-hidden w-full flex items-center justify-center ${filterTheme(
        color
      )}`}
    >
      <div
        className="h-full w-40 mr-6 bg-no-repeat bg-cover bg-local bg-center"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>
      <div className="flex-grow mr-6 -mt-1">
        <div className={`text-left text-md h-16 mb-2 ${filterText(style)}`}>
          <p className="font-bold">{name}</p>
          <p className="text-xs">{desc}</p>
        </div>
        <div className="flex">
          <span
            className={`${filterText(style)} text-xs text-left flex-grow mt-2`}
          >
            <p>@ {instructor}</p>
            <div className="opacity-75">
              <Icon fill={faMapMarkerAlt}></Icon>
              <span className="-ml-2">{location}</span>
            </div>
          </span>
          <button
            className="bg-white hover:bg-gray-400 text-black w-24 py-3 px-4 rounded-full"
            onClick={() => {
              window.location.assign(url)
            }}
          >
            {cost == 0 ? 'ฟรี' : `${cost} บาท`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
