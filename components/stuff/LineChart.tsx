import { ResponsiveLine } from '@nivo/line'

type Props = {
  data: any
}

const LineChart = ({ data }: Props) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: 'point' }}
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    curve="cardinal"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'transportation',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 7,
      tickPadding: 5,
      tickRotation: -26,
      legend: 'count',
      legendOffset: -44,
      legendPosition: 'middle',
    }}
    enableGridY={false}
    colors={{ scheme: 'dark2' }}
    pointSize={7}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-9}
    enableArea={true}
    areaBlendMode="multiply"
    areaOpacity={0.1}
    enableCrosshair={false}
    useMesh={true}
    legends={[
      {
        anchor: 'right',
        direction: 'column',
        justify: false,
        translateX: 96,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
)

export default LineChart
