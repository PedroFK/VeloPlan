import { WorkoutInterval } from '@/types/workout';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';
import { useColorScheme } from './useColorScheme';

interface WorkoutChartProps {
  intervals: WorkoutInterval[];
}

export const WorkoutChart: React.FC<WorkoutChartProps> = ({ intervals }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  if (!intervals || intervals.length === 0) {
    return (
      <View
        style={[
          styles.emptyChart,
          {
            backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
            borderColor: isDark ? '#334155' : '#e2e8f0',
          },
        ]}
      >
        <Text style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
          Nenhum dado de intervalo disponível
        </Text>
      </View>
    );
  }

  // Gera dados para o gráfico
  const data: { x: number; y: number }[] = [];
  let currentTime = 0;

  intervals.forEach((interval) => {
    data.push({ x: currentTime, y: interval.intensity });
    currentTime += interval.duration;
    data.push({ x: currentTime, y: interval.intensity });
  });

  const screenWidth = Dimensions.get('window').width;
  const width = screenWidth - 80; // Margem para labels
  const height = 250;
  const maxX = Math.max(...data.map((d) => d.x));
  const maxY = 5; // Intensidade máxima (z5)
  const padding = 40;

  // Cria o caminho SVG
  const pathData = data
    .map((point, index) => {
      const x = padding + ((point.x / maxX) * (width - padding * 2));
      const y = padding + (height - padding * 2) - ((point.y / maxY) * (height - padding * 2));
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(' ');

  const areaPath = `${pathData} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`;

  // Linhas de grade
  const gridLines = [1, 2, 3, 4, 5].map((zone) => {
    const y = padding + (height - padding * 2) - ((zone / maxY) * (height - padding * 2));
    return { zone, y };
  });

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: isDark ? '#e2e8f0' : '#334155' },
        ]}
      >
        Intensidade do Treino
      </Text>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </LinearGradient>
        </Defs>

        {/* Linhas de grade */}
        {gridLines.map((line) => (
          <React.Fragment key={line.zone}>
            <Line
              x1={padding}
              y1={line.y}
              x2={width - padding}
              y2={line.y}
              stroke={isDark ? '#334155' : '#e2e8f0'}
              strokeWidth="1"
              strokeDasharray="4,4"
            />
            <SvgText
              x={padding - 25}
              y={line.y + 5}
              fill={isDark ? '#94a3b8' : '#64748b'}
              fontSize="12"
            >
              Z{line.zone}
            </SvgText>
          </React.Fragment>
        ))}

        {/* Área preenchida */}
        <Path d={areaPath} fill="url(#chartGradient)" />

        {/* Linha do gráfico */}
        <Path d={pathData} stroke="#3b82f6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>

      {/* Legenda de tempo */}
      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: isDark ? '#94a3b8' : '#64748b' }]}>
          0 min
        </Text>
        <Text style={[styles.legendText, { color: isDark ? '#94a3b8' : '#64748b' }]}>
          {Math.round(maxX)} min
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyChart: {
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 40,
  },
  legendText: {
    fontSize: 12,
  },
});

