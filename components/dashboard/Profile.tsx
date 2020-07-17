import Player from '../stuff/Player'
import { useProfile } from '../../store/index'
import { photos } from '../static/index'
import SocialMeter from '../stuff/SocialMeter'
import ProfileCard from '../stuff/ProfileCard'
import Gallery from 'react-photo-gallery'

const Profile = () => {
  const {
    profile: {
      name,
      feature_video,
      description,
      follower: { facebook, youtube, instagram },
    },
  } = useProfile()
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
        <div className="row-span-3 col-span-2 ">
          <h3 className="text-4xl font-normal leading-normal mt-0 mb-2 text-indigo-700">
            {name}
          </h3>
          <hr className="mt-6 mb-8 border-b-1 border-gray-300" />
          <SocialMeter type="facebook" follower={facebook} />
          <SocialMeter type="youtube" follower={youtube} />
          <SocialMeter type="instagram" follower={instagram} />
          <p className="text-lg font-light leading-relaxed mt-6 mb-4 text-indigo-700">
            {description}
          </p>
          <ProfileCard />
        </div>
      </div>
    </main>
  )
}

export default Profile
