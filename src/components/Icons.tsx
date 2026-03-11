// src/components/DisclosureIndicator.tsx
import { Ionicons } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

type IconProps = {
  style?: StyleProp<ViewStyle>;
};

export function DisclosureIndicator() {
  return (
    <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
  );
}

export function Expand({ style }: IconProps) {
  return (
    <Ionicons style={style} name="chevron-expand" size={16} color="#C7C7CC" />
  );
}

export function AddIcon({ style }: IconProps) {
  return (<Ionicons name="add" size={24} color="#007AFF" />);
}