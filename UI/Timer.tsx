import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";

export default function Timer() {

    const [showTimer, setShowTimer] = useState(true);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setShowTimer(!showTimer)}>
                <Text style={styles.button}>
                {showTimer ? 'Unmount Timer' : 'Mount Timer'}
                </Text>
            </TouchableOpacity>
            {showTimer && <TimerComponent />}
        </View>
    )
    
    
}

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('TimerComponent mounted');
    
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup — 對應 onDisappear / deinit
    return () => {
      console.log('TimerComponent unmounted, cleanup!');
      clearInterval(interval);
    };
  }, []);

  return <Text style={{ fontSize: 48, marginTop: 32 }}>{seconds}</Text>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
  }
});