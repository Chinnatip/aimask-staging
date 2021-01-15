import { MarkerProperty } from '../../interfaces/marker'

type Props = {
  markers: MarkerProperty[]
  action: any
  pop?: any
  actionStatus?: any
}

const Drawer = ({markers, action, actionStatus ,pop}: Props) => {
  return (
    <>
      <aside
        className="overflow-scroll shadow-xl fixed z-50 mt-16 h-screen"
        style={{ background: "rgba(255, 185, 134, 0.54)" }}
      >
        <nav className="text-left overflow-auto h-full">
          {markers.map((point, idx) => {
            const {
              name,
              no_correct_wear_mask,
              no_incorrect_wear_mask,
              no_not_wear_mask,
              total,
            } = point
            const no_correct_wear_mask_pct =
              (no_correct_wear_mask / total) * 100
            const no_incorrect_wear_mask_pct =
              (no_incorrect_wear_mask / total) * 100
            const no_not_wear_mask_pct = (no_not_wear_mask / total) * 100
            const sty = `${no_not_wear_mask_pct}fr ${no_incorrect_wear_mask_pct}fr ${no_correct_wear_mask_pct}fr`
            return (
              <button
                id={idx.toString()}
                onClick={() => { actionStatus(true); action(point.name)}}
                className={`block py-3 px-5 hover:bg-gray-100 ${pop == point.name && 'bg-gray-100'}	`}
              >
                <span id={idx.toString()}>{name}</span>
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
