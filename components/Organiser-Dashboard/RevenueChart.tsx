import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const filteredData = filter === 'all' ? data : data.slice(data.length - parseInt(filter));

  return (
    <div className='flex flex-col bg-primary'>
        <h2>Total Revenue</h2>
        <p>Total tickets sold: {filteredData.reduce((total, { ticketsSold }) => total + ticketsSold, 0)}</p>
        <p>Total revenue: {filteredData.reduce((total, { revenue }) => total + revenue, 0)}</p>
        <p>Filter by:</p>
        <div className='flex flex-row space-x-2 rounded border'>
            <button onClick={() => handleFilter('all')}>
                <text className='text-sm font-medium hover:underline dark:text-blue-400'>All</text>
            </button>
            <button onClick={() => handleFilter('1')}>
                <text className="text-sm font-light hover:underline dark:text-blue-400">Last 1 day </text>
                </button>
            <button onClick={() => handleFilter('3')}>
                <text className="text-sm font-light hover:underline dark:text-blue-400">Last 3 days </text>
                </button>
            <button onClick={() => handleFilter('7')}>
                <text className="text-sm font-light hover:underline dark:text-blue-400">Last 7 days </text>
                </button>
            <button onClick={() => handleFilter('14')}>
                <text className="text-sm font-light hover:underline dark:text-blue-400">Last 14 days </text>
                </button>
            <button onClick={() => handleFilter('30')}>
                <text className="text-sm font-light hover:underline dark:text-blue-400">Last 30 days </text>
                </button>
        </div>
        <div className='flex flex-row space-x-2 rounded border'>
            <LineChart width={600} height={300} data={filteredData}>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    </div>
  );
};

export default RevenueChart;
