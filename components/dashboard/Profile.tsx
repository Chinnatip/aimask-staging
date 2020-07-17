import Player from '../stuff/Player'
import { useProfile } from '../../store/index'

const Profile = () => {
  const {
    profile: { name, feature_video },
  } = useProfile()
  return (
    <main className="w-full flex-grow p-6">
      <h1 className="text-3xl text-black pb-6">{name}</h1>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-1 col-span-2 ">
          <Player link={feature_video} height="480px" />
        </div>
        <div className="row-span-3 col-span-6 ">
          <h1>Yolo</h1>
        </div>
      </div>
    </main>
  )
}

export default Profile
