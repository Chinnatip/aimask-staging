import { FacebookIcon, YoutubeIcon, InstagramIcon } from './Icon'

type Props = {
  type: string
  follower?: number
}

const calculate = (follower: number) => {
  if (follower > 1000000) {
    return `${Math.floor(follower / 1000000)} M`
  } else if (follower > 1000) {
    return `${Math.floor(follower / 1000)} K`
  } else {
    return follower
  }
}

const SocialMeter = ({ type, follower = 0 }: Props) => {
  switch (type) {
    case 'facebook':
      return (
        <button
          className="bg-blue-600 text-white active:bg-blue-900 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 text-sm"
          style={{ transition: 'all .15s ease' }}
        >
          <FacebookIcon />
          {calculate(follower)}
        </button>
      )
    case 'youtube':
      return (
        <button
          className="bg-red-600 text-white active:bg-red-900 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 text-sm"
          style={{ transition: 'all .15s ease' }}
        >
          <YoutubeIcon />
          {calculate(follower)}
        </button>
      )
    case 'instagram':
      return (
        <button
          className="bg-purple-800 text-white active:bg-purple-900 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 text-sm"
          style={{ transition: 'all .15s ease' }}
        >
          <InstagramIcon />
          {calculate(follower)}
        </button>
      )
    default:
      return <></>
  }
}
export default SocialMeter
