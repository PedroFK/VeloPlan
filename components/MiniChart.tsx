import { useTheme } from '@/contexts/ThemeContext';
import { WorkoutInterval } from '@/types/workout';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface MiniChartProps {
  intervals: WorkoutInterval[];
}

export const MiniChart: React.FC<MiniChartProps> = ({ intervals }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!intervals || intervals.length === 0) {
    return (
      <View
        style={[
          styles.emptyChart,
          { backgroundColor: isDark ? '#0f172a' : '#f1f5f9' },
        ]}
      />
    );
  }

  const data: { x: number; y: number }[] = [];
  let currentTime = 0;

  intervals.forEach((interval) => {
    data.push({ x: currentTime, y: interval.intensity });
    currentTime += interval.duration;
    data.push({ x: currentTime, y: interval.intensity });
  });

  const width = 300;
  const height = 60;
  const maxX = Math.max(...data.map((d) => d.x));
  const maxY = 5;

  const pathData = data
    .map((point, index) => {
      const x = (point.x / maxX) * width;
      const y = height - (point.y / maxY) * height;
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  const areaPath = `${pathData} L ${width} ${height} L 0 ${height} Z`;

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
            <Stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>
        <Path d={areaPath} fill="url(#gradient)" />
        <Path d={pathData} stroke="#3b82f6" strokeWidth="2" fill="none" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyChart: {
    flex: 1,
    borderRadius: 8,
  },
});

