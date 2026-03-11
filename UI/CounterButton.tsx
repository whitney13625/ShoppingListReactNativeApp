import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CounterButtonProps = {
  label: string;
  onPress: () => void;
};

export default function CounterButton({ label, onPress }: CounterButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 32,
  },
});