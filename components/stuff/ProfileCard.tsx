import { useProfile } from '../../store/index'

const ProfileCard = () => {
  const {
    profile: { name, tags, picture, cover_image, description },
  } = useProfile()
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full bri-70"
        src={cover_image}
        alt="Sunset in the mountains"
      />
      <img
        className="h-20 w-20 rounded-full ml-10 -mt-10 shadow-lg bri-100"
        src={picture}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag) => (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            {`#${tag}`}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProfileCard
