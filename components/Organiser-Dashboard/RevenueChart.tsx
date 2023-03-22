import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

const { Option } = Select;
const event = 'Reblooming Roses';

const data = [
  { date: '2022-03-01', revenue: 5000, ticketsSold: 100 },
  { date: '2022-03-02', revenue: 8000, ticketsSold: 150 },
  { date: '2022-03-03', revenue: 10000, ticketsSold: 200 },
  { date: '2022-03-04', revenue: 6000, ticketsSold: 120 },
  { date: '2022-03-05', revenue: 7000, ticketsSold: 130 },
  { date: '2022-03-06', revenue: 9000, ticketsSold: 180 },
  { date: '2022-03-07', revenue: 12000, ticketsSold: 240 },
];

const RevenueChart = () => {
  const [filter, setFilter] = useState('all');

  const handleFilter = (filter: React.SetStateAction<string>) => {
    setFilter(filter);
  };

  const filteredData = filter === 'All' ? data : data.slice(data.length - parseInt(filter));

  const handleEventFilter = (value: string) => {
    console.log(`Selected event filter: ${value}`);
    // do something with the selected event filter
  };

  return (
    <div className='flex flex-col gap-4'>
      <Title level={4}>Revenue</Title>
      <div className='flex flex-col'>
        <Title level={5}>Total Revenue</Title>
        <Text type="secondary">Total tickets sold: {filteredData.reduce((total, { ticketsSold }) => total + ticketsSold, 0)}</Text>
        <Text type="secondary">Total revenue: ${filteredData.reduce((total, { revenue }) => total + revenue, 0)}</Text>
      </div>
      <div className='flex flex-row space-x-2'>
        <Select defaultValue={event} style={{ width: 200 }} onChange={handleEventFilter}>
          <Option value='Reblooming Roses'>Reblooming Roses</Option>
          <Option value='Spring Fling'>Spring Fling</Option>
          <Option value='Summer Garden'>Summer Garden</Option>
        </Select>
        <Select defaultValue='all' style={{ width: 120 }} onChange={handleFilter}>
            <Option value='All'>All time</Option>
            <Option value='1'>Last 1 day</Option>
            <Option value='3'>Last 3 days</Option>
            <Option value='7'>Last 7 days</Option>
        </Select>
      </div>
      <LineChart width={450} height={400} data={filteredData}>
          <XAxis dataKey='date' />
          <YAxis />
          <CartesianGrid strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='revenue' stroke='#8884d8' activeDot={{ r: 8 }} />
          <Line type='monotone' dataKey='ticketsSold' stroke='#82ca9d' />
      </LineChart>
    </div>);
};

export default RevenueChart;