import { CameraDetail } from '../../interfaces/marker'

type Props = {
  markers: CameraDetail[]
  action: any
  pop?: any
  actionStatus?: any
  actionCenter?: any
}


const Drawer = ({markers, action, actionStatus, actionCenter ,pop}: Props) => {
  return (
    <>
      <aside id="Drawer"
        className="overflow-scroll shadow-xl fixed z-30"
        style={{ background: "rgba(255, 185, 134, 0.54)", top: "4rem", bottom: "4rem", transitionDuration: "0.5s", right: "100%" }}
      >
        <nav className="text-left overflow-auto h-full">
          {markers.map((point, idx) => {
            const {
              name,
              latitude,
              longitude,
              result: {
                no_correct_wear_mask,
                no_incorrect_wear_mask,
                no_not_wear_mask,
                total,
              }
            } = point
            const no_correct_wear_mask_pct =
              (no_correct_wear_mask / total) * 100
            const no_incorrect_wear_mask_pct =
              (no_incorrect_wear_mask / total) * 100
            const no_not_wear_mask_pct = (no_not_wear_mask / total) * 100
            const sty = `${no_not_wear_mask_pct}fr ${no_incorrect_wear_mask_pct}fr ${no_correct_wear_mask_pct}fr`
            return (
              <button
                key={idx}
                id={idx.toString()}
                onClick={() => { actionStatus(true); action(point.name); actionCenter([latitude, longitude])}}
                className={`text-left block pt-3 pb-5 px-5 hover:bg-gray-100 ${pop == point.name && 'bg-gray-100'}	`}
              >
                <span className="text-gray-800" id={idx.toString()}>{name}</span>
                <div
                  id="mask-meter"
                  style={{
                    display: "grid",
                    gridTemplateColumns: sty,
                    width: 250,
                  }}
                >
                  <div
                    id="not_wear"
                    className="bg-red-500 text-center text-transparent"
                  >
                    {no_not_wear_mask_pct > 0 ? "1" : ""}
                  </div>
                  <div
                    id="incorrect_wear"
                    className="bg-yellow-500 text-center text-transparent"
                  >
                    {no_incorrect_wear_mask_pct > 0 ? "1" : ""}
                  </div>
                  <div
                    id="correct_wear"
                    className="bg-green-500 text-center text-transparent"
                  >
                    {no_correct_wear_mask_pct > 0 ? "1" : ""}
                  </div>
                </div>
              </button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Drawer
