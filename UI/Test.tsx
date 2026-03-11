import { StyleSheet, Text, View, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import CounterButton from './CounterButton';
import Timer from './Timer';

export default function App() {

  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [message, setMessage] = useState('');

  const handlePress = () => {
    Alert.alert('Hello!', '你按了按鈕');
  };

  // [] = 只執行一次，對應 viewDidLoad
  useEffect(() => {
    setMessage('App 載入了！');
  }, []);

  // [count] = 每次 count 變化時執行，對應 .onChange(of: count)
  useEffect(() => {
    if (count === 0) return;
    setMessage(`你按了 ${totalCount} 次`);
  }, [count]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.title}>{count}</Text>
        <View style={styles.buttonRow}>
          <View style={styles.buttonRow}>
        <CounterButton 
          label="－" 
          onPress={() => {
            setCount(count - 1);
            setTotalCount(totalCount + 1);
          }} 
        />
        <CounterButton 
          label="＋" 
          onPress={() => {
            setCount(count + 1);
            setTotalCount(totalCount + 1);
          }} 
        />
      </View>
        </View>
        <View style={{ flexDirection: 'row', height: 20, marginTop: 20 }}>
          <View style={{ flex: 1, backgroundColor: '#FF3B30' }} />
          <View style={{ flex: 2, backgroundColor: '#007AFF' }} />
          <View style={{ flex: 1, backgroundColor: '#34C759' }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    color: '#666',
    alignSelf: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
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
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
});