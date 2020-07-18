import Icon from './Icon'
import LineChart from './LineChart'
import BarChart from './BarChart'

type Props = {
  title: string
  type: string
  data: any
  icon?: any
}

type SelecProps = {
  type: string
  data: any
}

const Selector = ({ data, type }: SelecProps) => {
  switch (type) {
    case 'bar':
      return <BarChart data={data} />
    case 'line':
      return <LineChart data={data} />
    default:
      return <div>Blank</div>
  }
}

const Chart = ({ title = '', type = 'bar', data, icon }: Props) => {
  return (
    <div className="w-full lg:w-1/2 pr-0 lg:pr-2  ">
      <p className="text-xl pb-3 flex items-center">
        <Icon fill={icon} />
        {title}
      </p>
      <div className="p-0 bg-white chart-height">
        <Selector data={data} type={type}></Selector>
      </div>
    </div>
  )
}

export default Chart
