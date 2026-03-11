// src/components/FormRow.tsx
import { View, StyleSheet } from 'react-native';

type Props = {
  children: React.ReactNode;
  isLast?: boolean;
};

export function FormRow({ children, isLast }: Props) {
  return (
    <>
      <View style={styles.row}>
        {children}
      </View>
      {!isLast && <View style={styles.separator} />}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginLeft: 16,
  },
});