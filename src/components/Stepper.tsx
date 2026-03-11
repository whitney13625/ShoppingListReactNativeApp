// src/components/Stepper.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

export function Stepper({ value, min = 1, max = 100, onChange }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, value <= min && styles.disabled]}
        onPress={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Text style={styles.buttonText}>－</Text>
      </TouchableOpacity>

      <Text style={styles.value}>{value}</Text>

      <TouchableOpacity
        style={[styles.button, value >= max && styles.disabled]}
        onPress={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Text style={styles.buttonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
  },
  disabled: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  value: {
    paddingHorizontal: 16,
    fontSize: 16,
  },
});