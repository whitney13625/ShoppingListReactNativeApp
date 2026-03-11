// src/components/FormSection.tsx
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title?: string;
  children: React.ReactNode;
};

export function FormSection({ title, children }: Props) {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.header}>{title.toUpperCase()}</Text>}
      <View style={styles.section}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    fontSize: 12,
    color: '#6B6B6B',
    marginBottom: 6,
    marginLeft: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
});