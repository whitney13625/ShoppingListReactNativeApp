import { useLayoutEffect } from 'react';
import { 
  View, Text, FlatList, StyleSheet, TouchableOpacity, Switch
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
import { Swipeable } from 'react-native-gesture-handler';
import { useListScreen } from '../../hooks/useListScreen';


type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'ShoppingList'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ShoppingListScreen({ navigation }: Props) {    
    
    const stackNavigation = useAppNavigation();

    const { 
        items: shoppingItems,
        isRefreshing, 
        handleRefresh, 
        handleDelete,
        execute: executeSetShoppingItems 
    } = useListScreen<ShoppingItem>(shoppingApi.getAll);


    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => stackNavigation.navigate('ShoppingItemDetail', {})}>
                <AddIcon/>
                </TouchableOpacity>
            ),
        });
    }, [navigation, stackNavigation]);

    async function handleToggle(itemId: string, newValue: boolean) {
        const item = shoppingItems.find(i => i.id === itemId);
        if (!item) return;

        const previousValue = item.purchased;

        executeSetShoppingItems(
            prev => prev.map(i => 
                i.id === itemId ? { ...i, purchased: newValue } : i
            ),
            () => shoppingApi.update(itemId, { purchased: newValue }).then(() => {}),
            prev => prev.map(i => 
                i.id === itemId ? { ...i, purchased: previousValue } : i
            )
        );
    }

    const renderRightActions = (itemId: string) => (
        <TouchableOpacity
            style={commonStyles.deleteButton}
            onPress={() => handleDelete(itemId, () => shoppingApi.delete(itemId))}
        >
            <Text style={commonStyles.deleteText}>Delete</Text>
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
});