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
        className="overflow-y-scroll shadow-xl fixed z-30"
        style={{ background: "#1b1a19e6", top: "4rem", bottom: "4rem", transitionDuration: "0.5s", right: "100%" }}>
        <nav className="text-left h-full">
          <div className='text-white px-4 py-4 border-gray-500 border-b' >
            <div className="text-xs"> ข้อมูลวันที่ 17 มกราคม 2564 </div>
            <div className="text-xl mt-2"> ที่อยู่ของคุณในปัจุบัน </div>
          </div>
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
            const ele_id = idx.toString()
            return (
              <button
                key={idx}
                id={ele_id}
                onClick={() => { actionStatus(true); action(point.name); actionCenter([latitude, longitude])}}
                className={`text-left block pt-3 pb-5 px-5 hover:bg-gray-100 ${pop == point.name && 'bg-gray-100'}	`}
              >
                <span
                  className={`text-xl ${pop == point.name ?  'text-gray-800' : 'text-white' } `}
                  id={ele_id}>
                  {name}
                </span>
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
