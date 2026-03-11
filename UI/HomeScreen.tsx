import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from '../App';
import ShoppingListScreen from '../src/screens/shopping/ShoppingListScreen';

//type Props = BottomTabScreenProps<TabParamList, 'Home'>;
type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;


export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Detail', { id: 100, title: '我的第一個項目' })}
        >
            <Text style={styles.buttonText}>Go to Detail</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={ [styles.button, { marginTop: 16 }] }
            onPress={() => navigation.navigate('List')}
        >
          <Text style={styles.buttonText}>Go to List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { marginTop: 16 }]}
          onPress={() => navigation.navigate('Posts')}
        >
          <Text style={styles.buttonText}>Go to Posts</Text>
        </TouchableOpacity>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});