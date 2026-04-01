import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Category } from '../../types';
import { categoriesApi } from '../../api/categoriesApi';
import { commonStyles } from '../../styles/common';
import { FormSection } from '../../components/FormSection';
import { FormRow } from '../../components/FormRow';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'CategoriesDetail'>;

export default function CategoriesDetailScreen({ navigation, route }: Props) {

    const item: Category | undefined = route.params?.category;

    const [name, setName] = useState(item?.name || '');

    function handleSave() {
        const itemData = {
            name,
        };

        if (item) {
            categoriesApi.update(item.id, itemData).then(() => {
                navigation.goBack();
            });
        } else {
            categoriesApi.add(itemData).then(() => {
                navigation.goBack();
            });
        }; 
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.title}>{item ? 'Edit Item' : 'Add Item'}</Text>
            <FormSection title="Name">
                <FormRow >
                    <TextInput 
                        style={[styles.input, { alignSelf: 'flex-start', textAlign: 'left' }]} 
                        value={name}
                        onChangeText={setName}
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
}
const styles = StyleSheet.create({
    input: {
        flex:1, 
        alignItems: 'flex-start',
        alignContent: 'flex-start',
    }, 
});