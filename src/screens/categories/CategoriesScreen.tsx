import { useLayoutEffect } from 'react';
import { 
  View, Text, TouchableOpacity, FlatList, StyleSheet
} from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Category } from '../../types';
import { categoriesApi } from '../../api/categoriesApi';
import { commonStyles } from '../../styles/common';
import { RootStackParamList, TabParamList } from '../../../App';
import { AddIcon, DisclosureIndicator } from '../../components/Icons';
import { useAppNavigation } from '../../hooks/useAppNavigation';
import { useAuth } from '../../context/AuthContext';
import { Swipeable } from 'react-native-gesture-handler';
import { useListScreen } from '../../hooks/useListScreen';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Categories'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function CategoriesScreen({ navigation }: Props) {    
    const stackNavigation = useAppNavigation();
        const { 
            items: categories, 
            isRefreshing, 
            handleRefresh, 
            handleDelete
        } = useListScreen<Category>(categoriesApi.getAll);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginEnd: 20 }} onPress={() => stackNavigation.navigate('ShoppingItemDetail', {})}>
                <AddIcon/>
                </TouchableOpacity>
            ),
            });
    }, [navigation]);

    const renderRightActions = (itemId: string) => (
        <TouchableOpacity
            style={commonStyles.deleteButton}
            onPress={() => handleDelete(itemId, () => categoriesApi.delete(itemId))}
        >
            <Text style={commonStyles.deleteText}>Delete</Text>
        </TouchableOpacity>
    );

  return (
    <View style={commonStyles.container}>
        <Text style={commonStyles.title}>Categories</Text>
            <FlatList 
                style={commonStyles.list} 
                data={categories} 
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                renderItem={( { item } ) => (
                    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                    <TouchableOpacity
                        style={styles.rowContent}
                        onPress={() => navigation.navigate('CategoriesDetail', { category: item }) } 
                    >
                        <View>
                            <Text>{item.name}</Text>
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
});