// src/hooks/useAppNavigation.ts
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, TabParamList } from '../../App';

export function useAppNavigation() {
  return useNavigation<NativeStackNavigationProp<RootStackParamList>>();
}

/* Coordinator pattern
export function useAppNavigation() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  return {
    goToShoppingDetail: (item?: ShoppingItem) => 
      navigation.navigate('ShoppingItemDetail', { item }),
    goToLogin: () => 
      navigation.navigate('Login'),
    goBack: () => 
      navigation.goBack(),
  };
}
  */