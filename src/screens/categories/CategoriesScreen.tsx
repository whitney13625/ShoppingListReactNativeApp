import { useState, useLayoutEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
  View, Text, TouchableOpacity
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ShoppingItem } from '../../types';
import { categoriesApi } from '../../api/categoriesApi';
import { RootStackParamList, TabParamList } from '../../../App';
import { AddIcon } from '../../components/Icons';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { useAuth } from '../../context/AuthContext';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Categories'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function CategoriesScreen({ navigation }: Props) {    
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

    const stackNavigation = useAppNavigation();

    const { logout } = useAuth();

    useFocusEffect(
        useCallback(() => {
            categoriesApi.getAll()
            .then(response => {
                setShoppingItems(response.data);
            })
            .catch(error => {
                console.log('fetch error:', error.response?.status);
                if (error.response?.status === 401) {
                    logout(); // TODO: refrehh token and retry
                }
            })
        }, [])
    );

    useLayoutEffect(() => {
        console.log('useLayoutEffect called', navigation); // 加這行
        navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={logout}>
            <Text style={{ color: '#007AFF' }}>Logout</Text>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => stackNavigation.navigate('ShoppingItemDetail', {})}>
            <AddIcon/>
            </TouchableOpacity>
        ),
        });
    }, [navigation]);

  return (
    <View>
    <Text >Placeholder view</Text>
    </View>
  );
}