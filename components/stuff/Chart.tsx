import Icon from './Icon'
import LineChart from '../stuff/LineChart'
import BarChart from '../stuff/BarChart'

type Props = {
  title: string
  type: string
  data: any
  icon?: any
}

const Chart = ({ title = '', type = 'bar', data, icon }: Props) => {
  return (
    <div className="w-full lg:w-1/2 pr-0 lg:pr-2  ">
      <p className="text-xl pb-3 flex items-center">
        <Icon fill={icon} />
        {title}
      </p>
      <div className="p-0 bg-white chart-height">
        {type == 'bar' ? (
          <BarChart data={data} />
        ) : type == 'line' ? (
          <LineChart data={data} />
        ) : (
          <div>Blank</div>
        )}
      </div>
    </div>
  )
}

export default Chart
