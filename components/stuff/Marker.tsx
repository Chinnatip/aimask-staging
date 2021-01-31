import { MarkerProps } from '../../interfaces/marker'
import { find_mask } from  '../strategy/marker'

export const Marker = (props: MarkerProps) => {
  return (
    <div className="text-b relative overflow-scroll-y">
      <button>
        <img src={`mask_icon/${find_mask(props.percentage)}.png`} className="-mt-2 -ml-2 rounded-full" style={{height: '26px', boxShadow: '0 4px 3px rgba(0, 0, 0, 0.25)'}} alt=""/>
      </button>
    </div>
  )
}
