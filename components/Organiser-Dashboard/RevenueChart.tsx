import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

const { Option } = Select;
const event = '';

interface Event {
  id: string;
  name: string;
  artist: string;
  imageUrl: string | null;
  eventDateTime: Date;
  venue: string;
}

const data = [
  { date: '2022-03-01', revenue: 5000, ticketsSold: 100 },
  { date: '2022-03-02', revenue: 8000, ticketsSold: 150 },
  { date: '2022-03-03', revenue: 10000, ticketsSold: 200 },
  { date: '2022-03-04', revenue: 6000, ticketsSold: 120 },
  { date: '2022-03-05', revenue: 7000, ticketsSold: 130 },
  { date: '2022-03-06', revenue: 9000, ticketsSold: 180 },
  { date: '2022-03-07', revenue: 12000, ticketsSold: 240 },
  { date: '2022-03-08', revenue: 10000, ticketsSold: 200 },
  { date: '2022-03-09', revenue: 6000, ticketsSold: 120 },
  { date: '2022-03-10', revenue: 7000, ticketsSold: 130 },
  { date: '2022-03-11', revenue: 8000, ticketsSold: 150 },
  { date: '2022-03-12', revenue: 10000, ticketsSold: 200 },
  { date: '2022-03-13', revenue: 6000, ticketsSold: 120 },
  { date: '2022-03-14', revenue: 7000, ticketsSold: 130 },
  { date: '2022-03-15', revenue: 9000, ticketsSold: 180 },
  { date: '2022-03-16', revenue: 12000, ticketsSold: 240 },
  { date: '2022-03-17', revenue: 10000, ticketsSold: 200 },
  { date: '2022-03-18', revenue: 6000, ticketsSold: 120 },
  { date: '2022-03-19', revenue: 7000, ticketsSold: 130 },
  { date: '2022-03-20', revenue: 8000, ticketsSold: 150 },
  { date: '2022-03-21', revenue: 10000, ticketsSold: 200 },
  { date: '2022-03-22', revenue: 6000, ticketsSold: 120 },
  { date: '2022-03-23', revenue: 7000, ticketsSold: 130 },
  { date: '2022-03-24', revenue: 9000, ticketsSold: 180 },
  { date: '2022-03-25', revenue: 12000, ticketsSold: 240 },
  
];

const RevenueChart = () => {
  const [filter, setFilter] = useState('all');
  const [allEvents, setAllEvents] = useState<Event[] | null>(null);
  const [recentEvent, setRecentEvent] = useState<Event[] | null>(null);
    

  const handleFilter = (filter: React.SetStateAction<string>) => {
    setFilter(filter);
  };

  const filteredData = filter === 'All' ? data : data.slice(data.length - parseInt(filter));

  const handleEventFilter = (value: string) => {
    console.log(`Selected event filter: ${value}`);
    // do something with the selected event filter
  };

  useEffect(() => {
    // Fetch events data from an API endpoint
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        // Parse date strings in events array to JavaScript Date objects
        const parsedEvents = data.map((event: Event) => ({
          ...event,
          eventDateTime: new Date(event.eventDateTime),
        }));
  
        // Sort events array in ascending order based on eventDateTime
        parsedEvents.sort(
          (a: { eventDateTime: { getTime: () => number } }, b: { eventDateTime: { getTime: () => number } }) => a.eventDateTime.getTime() - b.eventDateTime.getTime()
        );
        setAllEvents(parsedEvents);
        // Find the first event whose eventDateTime is greater than or equal to today's date
      const today = new Date();
      const closestEvent = parsedEvents.find(
        (event: { eventDateTime: { getTime: () => number } }) => event.eventDateTime.getTime() >= today.getTime()
      );

      // Set the closestEvent in state
      setRecentEvent(closestEvent ? [closestEvent] : null);
      });
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <Title level={4}>Revenue</Title>
      <div className='flex flex-col'>
        <Title level={5}>Total Revenue</Title>
        <Text type="secondary">Total tickets sold: {filteredData.reduce((total, { ticketsSold }) => total + ticketsSold, 0)}</Text>
        <Text type="secondary">Total revenue: ${filteredData.reduce((total, { revenue }) => total + revenue, 0)}</Text>
      </div>
      <div className='flex flex-row space-x-2'>
        <Select defaultValue={"Please select"} style={{ width: 200 }} onChange={handleEventFilter}>
          {allEvents?.map((event) => (
            <Option key={event.id} value={event.name}>
              {event.name}
            </Option>
          ))}
        </Select>
        <Select defaultValue='All' style={{ width: 120 }} onChange={handleFilter}>
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