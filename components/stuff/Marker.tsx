import { MarkerProps } from '../../interfaces/marker'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { find_mask } from  '../strategy/marker'
import dayjs from 'dayjs'
import Icon from './Icon'

export const Marker = (props: MarkerProps) => {
  const { data, pop, action, status, actionStatus, actionCenter } = props
  // const [ modal, setModal ] = useState(pop)
  const {
    result: {
      no_correct_wear_mask,
      no_incorrect_wear_mask,
      no_not_wear_mask ,
      total ,
      percentage
    },
    detect_timestamp ,
    latitude,
    longitude
  } = data
  const calc = (num: number, total: number) =>  (num * 100 / total).toFixed(2)
  return (
    <div className="text-b relative">
      { status && (pop == data.name) && <div className="z-10 text-b absolute p-4 bg-white -ml-40 rounded-lg shadow-xl" style={{ marginTop: '-16.4rem', width: '20rem', height: '15rem' }}>
        <div className="text-gray-700 text-xl relative">
          {data.name}
          <button onClick={() => actionStatus(!status)} className="bg-gray-300 h-8 w-8 rounded-full absolute top-0 right-0">X</button>
        </div>
        {/* <img src={`./label/${data.name}.png`} className="m-auto mt-2" style={{ height: '9rem' }} /> */}
        {/* <hr /> */}
        <div className="mt-4 text-xs grid text-gray-700 grid-flow-row grid-cols-4 grid-rows-3 gap-0">
          <div className="col-span-2 h-4 text-center"></div>
          <div className="h-8 flex items-center justify-center text-md">จำนวนคน</div>
          <div className="h-8 flex items-center justify-center text-md">สัดส่วน</div>
          <div className="h-8 flex items-center col-span-2 text-left border-b">ใส่หน้ากากถูกต้อง</div>
          <div className="h-8 text-lg flex items-center justify-center text-green-600 border-b text-md">{no_correct_wear_mask}</div>
          <div className="h-8 text-lg flex items-center justify-center text-green-600 border-b text-md">{calc(no_correct_wear_mask, total)}%</div>
          <div className="h-8 flex items-center col-span-2 border-b text-left">ใส่หน้ากากไม่ถูกต้อง</div>
          <div className="h-8 text-lg flex items-center justify-center border-b text-yellow-600 text-md">{no_incorrect_wear_mask}</div>
          <div className="h-8 text-lg flex items-center justify-center border-b text-yellow-600 text-md">{calc(no_incorrect_wear_mask, total)}%</div>
          <div className="h-8 flex items-center col-span-2 text-left">ไม่ใส่หน้ากาก</div>
          <div className="h-8 text-lg flex items-center justify-center text-red-600 text-md">{no_not_wear_mask}</div>
          <div className="h-8 text-lg flex items-center justify-center text-red-600 text-md">{calc(no_not_wear_mask, total)}%</div>
        </div>
        <div className='mt-2 mr-2 text-right text-xs text-gray-500'>อัพเดทวันที่ { dayjs( parseInt(detect_timestamp) * 1000).format('DD MMM YYYY HH:MM')}</div>
        <span className="w-full ml-3 text-center text-white absolute bottom-0 left-0 text-4xl" style={{marginBottom: '-1.6rem'}}>
          <Icon fill={faCaretDown}/>
        </span>
      </div>}
      <button onClick={() => { actionStatus(true); actionCenter([latitude,longitude]); action(data.name)}}>
        <img src={`mask_icon/${find_mask(percentage)}.png`} className="-mt-2 -ml-2 rounded-full" style={{height: '26px', boxShadow: '0 4px 3px rgba(0, 0, 0, 0.25)'}} alt=""/>
      </button>
    </div>
  )
}
