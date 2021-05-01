import { ResponsiveBar } from '@nivo/bar'

const lineGraphSettings = {
    theme: {
        fontSize: '12px',
        fontFamily: 'Sukhumvit Set',
        axis: { legend: { text: {
            fontSize: 17
         }}
        }
    },
};

const Bar = ({ data }) => {
    console.log(data)
    return <ResponsiveBar
        fontFamily='Sukhumvit Set'
        data={data}
        keys={[ 'ไม่ใส่' ]}
        indexBy="เขต"
        margin={{ top: 30, right: 80, bottom: 40, left: 120 }}
        padding={0.35}
        theme={lineGraphSettings.theme}
        layout="horizontal"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={({ id, data }) => data['color']}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'อันดับเขตเสี่ยง เปลี่ยนแปลง',
            legendPosition: 'middle',
            legendOffset: -100,
            itemTextColor: '#ffc800'
        }}
        enableGridX={true}
        enableGridY={false}
        label={d => d}
        labelFormat={(d) => {
            return <>
                <tspan font={'bold 30px italic'}>{ `${d.value}%` }</tspan>
                <tspan x={`${(d.value*12) + 10.5}%`}>{ `(${data[d.index]['correct']}/${data[d.index]['total']})` }</tspan>
            </>
        }}
        labelSkipWidth={11}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
}

export default Bar
