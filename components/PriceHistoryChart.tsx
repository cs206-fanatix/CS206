import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
    Label,
} from 'recharts';

interface props {
	data: Array<{date: string;
		price: number;}>
}

const PriceHistoryChart = (props: props) => {
	return (
        <LineChart
          width={400}
          height={300}
          data={props.data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dx={5}>
            <Label angle={270} value="Price (SGD)">
            </Label>
          </YAxis>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#ee4865" activeDot={{ r: 8 }} />
        </LineChart>
	);
};

export default PriceHistoryChart;
