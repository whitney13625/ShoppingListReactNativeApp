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
import { useAuth } from '../../context/AuthContext';
import { Swipeable } from 'react-native-gesture-handler';


type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'ShoppingList'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ShoppingListScreen({ navigation }: Props) {    
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const stackNavigation = useAppNavigation();

    const { logout } = useAuth();

    useFocusEffect(
        useCallback(() => {
            shoppingApi.getAll()
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

    async function handleToggle(itemId: string, newValue: boolean) {
        console.log(`Toggled item ${itemId} to ${newValue}`);
        const item =shoppingItems.find(i => i.id === itemId);
        if (!item) return;

    const previousValue = item.purchased;

        setShoppingItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, purchased: newValue } : i
    ));
        try {
            await shoppingApi.update(itemId, { purchased: newValue });
        } catch (error) {
            console.log('Error updating item:', error);
            setShoppingItems(prev => prev.map(i => 
                i.id === itemId ? { ...i, purchased: previousValue } : i
            ));
        }
        
    }

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            const response = await shoppingApi.getAll();
            setShoppingItems(response.data);
        } finally {
            setIsRefreshing(false);
        }
    };

    const handleDelete = async (itemId: string) => {
        await shoppingApi.delete(itemId);
        setShoppingItems(items => items.filter(i => i.id !== itemId));
    };

    const renderRightActions = (itemId: string) => (
    <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(itemId)}
    >
        <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
    );

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>Shopping List</Text>
                <FlatList 
                    style={commonStyles.list} 
                    data={shoppingItems} 
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    renderItem={( { item } ) => (
                        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
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
                        </Swipeable>
                    )} 
                />
            
        </View>
    );
}

const styles = StyleSheet.create({
    rowContent: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: 12,
        backgroundColor: '#fff',
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
    deleteButton: {
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});