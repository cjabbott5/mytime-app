import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const moodValues = { Happy: 5, Neutral: 3, Sad: 1, Angry: 2, Tired: 2 };

export default function MoodTrendChart({ moodLog = [] }) {
  const data = moodLog.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    mood: moodValues[entry.mood] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Line type="monotone" dataKey="mood" stroke="#ec4899" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
