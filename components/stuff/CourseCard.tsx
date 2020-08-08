type Media = {
  type: string
  url: string
  thumbnail: string
  duration?: number
}

type Theme = {
  style: string
  color: string
}

type Props = {
  data: {
    name: string
    instructor: string
    theme: Theme
    view: number
    rating: number
    media: Media
  }
  last: boolean
  total: number
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

const Card = ({ data, last = false, total = 0 }: Props) => {
  const {
    theme: { style, color },
    media: { url, thumbnail, type: mediaType, duration },
    rating,
    name,
    instructor,
  } = data
  return (
    <button
      className="w-1/6 relative rounded-lg overflow-hidden my-4 ml-6 bg-white"
      onClick={() => {
        window.location.assign(url)
      }}
    >
      {last && (
        <div
          className="flex flex-col items-center justify-center"
          style={{
            height: '100%',
            width: '100%',
            zIndex: 2,
            position: 'absolute',
            backgroundColor: '#000000bd',
          }}
        >
          <p className="text-white text-3xl font-bold -mt-4 mb-1">
            {total - 4}
          </p>
          <img src="ic_playlist.png" className="w-12" alt="playlist icon" />
        </div>
      )}

      <div
        className={`relative bg-no-repeat bg-cover bg-local bg-center ${filterTheme(
          color
        )} h-40 w-full`}
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        <span
          className={`absolute text-sm leading-4 border-b-2 ${
            style == 'light'
              ? 'text-black border-black'
              : 'text-white border-white'
          }`}
          style={{ top: '8px', right: '10px' }}
        >
          {rating}
        </span>
        {mediaType == 'vdo' && (
          <img
            src="ic_youtube.png"
            className="absolute inset-1/2 h-24"
            style={{ transform: 'translate(-50%, -50%)' }}
            alt="course image"
          />
        )}
      </div>

      <div className={`px-3 py-2 h-24 ${filterTheme(color)} `}>
        <div className={`font-bold text-left text-md h-8 ${filterText(style)}`}>
          {name}
        </div>
        <p className={`${filterText(style)} text-xs text-left mt-2`}>
          @ {instructor}
        </p>
        <div className="flex">
          <span
            className={`${filterText(
              style
            )} text-xs text-left uppercase flex-grow`}
          >
            {mediaType}
          </span>
          <span className={`${filterText(style)} text-xs text-left`}>
            {`${duration} min`}
          </span>
        </div>
      </div>
    </button>
  )
}

export default Card
