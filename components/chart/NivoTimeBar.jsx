import { ResponsiveBar } from '@nivo/bar'



const Bar = ({ data , color }) => {
  const lineGraphSettings = {
    theme: {
        fontSize: '10px',
        textColor: color,
    },
  };
  return (
    <ResponsiveBar
        data={data}
        keys={[ 'value']}
        indexBy="date"
        margin={{ top: 10, right: 0, bottom: 25, left: 30 }}
        padding={0.5}
        colors={({ id, data }) => data['color']}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        theme={lineGraphSettings.theme}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[]}
        isInteractive={false}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)
}

export default Bar
