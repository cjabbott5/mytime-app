import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function SleepBarChart({ sleepLog = [] }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return {
      day: days[d.getDay()],
      label: d.toLocaleDateString(),
      hours: (() => {
        const match = sleepLog.find(e => new Date(e.day).toDateString() === d.toDateString());
        return match ? match.hours : 0;
      })(),
    };
  });

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={last7Days}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip formatter={(val) => `${val} hrs`} />
        <Bar dataKey="hours" fill="#ec4899" />
      </BarChart>
    </ResponsiveContainer>
  );
}
