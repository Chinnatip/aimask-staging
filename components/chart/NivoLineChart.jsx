import { ResponsiveLine } from '@nivo/line'

const lineGraphSettings = {
  theme: {
      fontSize: '10px',
      color: '#ffc800'
  },
};

const Line = ({ data }) => (
    <ResponsiveLine
        data={data}
        margin={{ top: 10, right: 30, bottom: 30, left: 40 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        theme={lineGraphSettings.theme}
        colors={({ id, data }) => '#E16407'}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridY={false}
        lineWidth={5}
        pointSize={12}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-24}
        useMesh={true}
        legends={[]}
    />
)

export default Line
