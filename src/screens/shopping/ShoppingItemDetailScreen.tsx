import { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShoppingItem, Category } from '../../types';
import { shoppingApi } from '../../api/shoppingApi';
import { categoriesApi } from '../../api/categoriesApi';
import { commonStyles } from '../../styles/common';
import { FormSection } from '../../components/FormSection';
import { FormRow } from '../../components/FormRow';
import { Stepper } from '../../components/Stepper';
import { CategoryPicker } from '../../components/CategoryPicker';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'ShoppingItemDetail'>;

export default function ShoppingItemDetailScreen({ navigation, route }: Props) {

    const item: ShoppingItem | undefined = route.params?.item;

    const [name, setName] = useState(item?.name || '');
    const [quantity, setQuantity] = useState(item?.quantity ?? 1);
    const [categoryId, setCategoryId] = useState(item?.category.id || '');
    const [purchased, setPurchased] = useState(item?.purchased || false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        categoriesApi.getAll().then(response => {
            setCategories(response.data);
        });

        if (item) {
            setName(item.name);
            setQuantity(item.quantity);
            setCategoryId(item.category.id);
            setPurchased(item.purchased);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleSave() {
        const itemData = {
            name,
            quantity: quantity,
            categoryId,
            purchased,
            category: categories.find(c => c.id === categoryId) ?? { id: categoryId, name: '' },
        };

        if (item) {
            shoppingApi.update(item.id, itemData).then(() => {
                navigation.goBack();
            });
        } else {
            shoppingApi.add(itemData).then(() => {
                navigation.goBack();
            });
        }; 
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>{item ? 'Edit Item' : 'Add Item'}</Text>
            <FormSection title="Item Details">
                <FormRow >
                    <TextInput 
                        style={[styles.input, { alignSelf: 'flex-start', textAlign: 'left' }]} 
                        value={name}
                        onChangeText={setName}
                    />  
                </FormRow>
            
                <FormRow>
                    <View style={{ flex: 1}}>
                        <Text >Quantity:</Text>
                    </View>
                    <View style={ {alignSelf: 'flex-end'} }>
                        <Stepper 
                            value={quantity}
                            onChange={setQuantity}
                        />
                    </View>
                      
                </FormRow>
                <FormRow>
                    <Text >Category: </Text>
                    <CategoryPicker
                        categories={categories}
                        selectedId={categoryId}
                        onSelect={(category) => setCategoryId(category.id)}
                    />
                    
                </FormRow>
                <FormRow>
                    <Text>Purchased: </Text>
                    <Switch
                        style={ {alignSelf: 'flex-end'} }
                        value={purchased}
                        onValueChange={setPurchased}
                    />
                </FormRow>
            </FormSection>
            
            <FormSection>
                <TouchableOpacity
                    style={[commonStyles.button, {alignSelf: 'center'}]}
                    onPress={handleSave}
                >
                    <Text style={commonStyles.buttonText}>
                        Save Changes
                    </Text>
                </TouchableOpacity>
            </FormSection>
        </View>
    )
};


const styles = StyleSheet.create({
    input: {
        flex:1, 
        alignItems: 'flex-start',
        alignContent: 'flex-start',
    }, 
});