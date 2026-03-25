import { useState, useLayoutEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, 
  Switch
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ShoppingItem } from '../../types';
import { shoppingApi } from '../../api/shoppingApi';
import { commonStyles } from '../../styles/common';
import { RootStackParamList, TabParamList } from '../../../App';
import { AddIcon, DisclosureIndicator } from '../../components/Icons';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { authApi } from '../../api/authApi';
import { tokenStorage } from '../../api/client';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'ShoppingList'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ShoppingListScreen({ navigation }: Props) {    
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);

    const stackNavigation = useAppNavigation();

    useFocusEffect(
        useCallback(() => {
            shoppingApi.getAll()
            .then(response => {
                setShoppingItems(response.data);
            })
            .catch(error => {
                console.log('fetch error:', error.response?.status);
                if (error.response?.status === 401) {
                // token 過期，清除 token
                tokenStorage.remove();
                }
            })
        }, [])
    );

    useLayoutEffect(() => {
        console.log('useLayoutEffect called', navigation); // 加這行
        navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => authApi.logout() }>
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

    function handleToggle(itemId: string, newValue: boolean) {
        console.log(`Toggled item ${itemId} to ${newValue}`);
        const item =shoppingItems.find(i => i.id === itemId);
        if (!item) return;

        shoppingApi.update(itemId, { purchased: newValue });
       
        setShoppingItems(shoppingItems.map(i => 
        i.id === itemId ? { ...i, purchased: newValue } : i
        ));
    }

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Shopping List</Text>
      <FlatList 
        style={commonStyles.list} 
        data={shoppingItems} 
        renderItem={( { item } ) => (
            <TouchableOpacity
                style={styles.rowContent}
                onPress={() => navigation.navigate('ShoppingItemDetail', { item: item }) } 
            >
                <View style={styles.rowContentLeft}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemNormal}>Quantity: {item.quantity}</Text>
                    <Text style={styles.itemGray}>Category: {item.category.name}</Text>
                </View>
                <View style={styles.rowContentRight}>
                    <Text style={styles.itemNormal}>Purchased?</Text>
                    <Switch style={{ alignSelf: 'flex-end' }}
                        value={item.purchased}
                        onValueChange={(newValue) => handleToggle(item.id, newValue)}
                    />
                </View>
                <DisclosureIndicator />
            </TouchableOpacity>
        )} />
    </View>
  );
}

const styles = StyleSheet.create({
    rowContent: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    rowContentLeft: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rowContentRight: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemNormal: {
        fontSize: 16,
    },
    itemGray: {
        fontSize: 18,
        color: '#666',
    },
});