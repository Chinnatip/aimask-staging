import { CameraDetail } from '../../interfaces/marker'
import { toggleDrawer } from '../strategy/toggle'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import Icon from '../stuff/Icon'

type Props = {
  date: string
  markers: CameraDetail[]
  action: any
  pop?: any
  actionStatus?: any
  actionCenter?: any
}

const Drawer = ({date, markers, action, actionStatus, actionCenter ,pop}: Props) => {
  return (
    <>
      <div id="Drawer"
        className="overflow-y-scroll shadow-xl fixed z-30 drawer-expand"
        style={{ background: "#1b1a19e6", transitionDuration: "0.5s" }}>
        <nav className="text-left h-full">
          <div className='text-white px-4 py-4 border-orange-400 border-b relative' >
            <div className="text-xs"> ข้อมูลวันที่ {date} </div>
            <div className="text-xl mt-1"> ที่อยู่ของคุณ ณ ปัจจุบัน </div>
            <button onClick={() => toggleDrawer()} className="lg:hidden text-white absolute top-0 right-0 mr-3 mt-3 text-xl">X</button>
          </div>
          {markers.sort((a,b) => a.result.percentage - b.result.percentage).map((point, idx) => {
            const {
              name,
              date,
              time,
              latitude,
              longitude,
              district_name,
              subdistrict_name,
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
                onClick={() => { toggleDrawer(); actionStatus(true); action(point.name); actionCenter([latitude, longitude])}}
                style={{ maxWidth: '15rem' }}
                className={`text-left block border-none pt-3 pb-5 px-5 hover:drawer-active ${pop == point.name && 'drawer-active'}	`}
              >
                <div className={`text-md text-white mb-1`} id={ele_id}>
                  {name}
                  <span className="text-orange-600 ml-2" > <Icon fill={faCaretRight}></Icon> </span>
                </div>
                <div className="text-white opacity-50 -mt-2 mt-3 text-xs font-thin">
                  แขวง{subdistrict_name} เขต{district_name}
                </div>
                <div
                  id="mask-meter"
                  className="relative"
                  style={{
                    display: "grid",
                    gridTemplateColumns: sty,
                    width: 200,
                  }}
                >
                  <span className="text-white absolute top-0 right-0 mr-3">{no_correct_wear_mask_pct.toFixed(2)}%</span>
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
                <div className="mt-1 opacity-50 text-white font-thin" style={{ fontSize: '0.6rem' }}>วันที่ {date} {time}</div>
              </button>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Drawer
