import Gallery from 'react-photo-gallery'
import Player from 'stuff/Player'
import SocialMeter from 'stuff/SocialMeter'
import ProfileCard from 'stuff/ProfileCard'
import { photos } from 'static'
import { useInfluencer } from 'store'

const Profile = () => {
  const {
    profile: {
      name,
      feature_video,
      description,
      follower: { facebook, youtube, instagram },
    },
  } = useInfluencer()
  return (
    <main className="w-full flex-grow p-6">
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-1 col-span-2 ">
          <Player link={feature_video} width="480px" />
          <br />
          <div style={{ width: '480px' }}>
            <Gallery photos={photos} />
          </div>
        </div>
        <div className="row-span-3 col-span-2 ml-4">
          <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-white mb-4">
            {name}
          </h3>
          <SocialMeter type="facebook" follower={facebook} />
          <SocialMeter type="youtube" follower={youtube} />
          <SocialMeter type="instagram" follower={instagram} />
          <div className="mb-20"></div>
          <p className="text-md font-light leading-relaxed mt-6 mb-4 text-gray-800">
            {description}
          </p>
          <ProfileCard />
        </div>
      </div>
    </main>
  )
}

export default Profile
