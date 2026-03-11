import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RootStackParamList } from '../App';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ navigation, route }: Props) {
  const { id, title } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <Text style={styles.id}>ID: {id}</Text>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

/*
export default function DetailScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
*/
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  id: { fontSize: 16, color: '#666', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: { backgroundColor: '#34C759', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16 },
});