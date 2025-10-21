jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-svg', () => ({
  Svg: 'Svg',
  Path: 'Path',
  Line: 'Line',
  Defs: 'Defs',
  LinearGradient: 'LinearGradient',
  Stop: 'Stop',
  Text: 'Text',
}));

jest.mock('lucide-react-native', () => ({
  Edit: 'Edit',
  Trash2: 'Trash2',
  Plus: 'Plus',
  Clock: 'Clock',
  Activity: 'Activity',
}));

