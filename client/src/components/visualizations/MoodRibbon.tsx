import React from 'react';
import { scaleLinear, scalePoint } from '@visx/scale';
import { AreaClosed } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';

type MoodPoint = {
  age: number;
  score: number;
};

type MoodRibbonProps = {
  timelineData: {
    age: number;
    items: {
      tone: 'Positive' | 'Neutral' | 'Negative';
    }[];
  }[];
  width?: number;
  height?: number;
};

const toneScores = {
  Positive: 1,
  Neutral: 0,
  Negative: -1,
};

const MoodRibbon: React.FC<MoodRibbonProps> = ({
  timelineData,
  width = 1000,
  height = 100,
}) => {
  const data: MoodPoint[] = timelineData.map((entry) => {
    const moodAvg =
      entry.items.length === 0
        ? 0
        : entry.items.reduce((acc, item) => acc + toneScores[item.tone], 0) /
          entry.items.length;
    return { age: entry.age, score: moodAvg };
  });

  const xScale = scalePoint({
    domain: data.map((d) => d.age),
    range: [0, width],
  });

  const yScale = scaleLinear({
    domain: [-1, 1],
    range: [height, 0],
  });

  return (
    <svg width={width} height={height}>
      <LinearGradient id="moodGradient" from="#f18973" to="#7ed6a7" />
      <AreaClosed
        data={data}
        x={(d) => xScale(d.age) ?? 0}
        y={(d) => yScale(d.score)}
        yScale={yScale}
        stroke="url(#moodGradient)"
        fill="url(#moodGradient)"
        curve={curveMonotoneX}
      />
    </svg>
  );
};

export default MoodRibbon;
