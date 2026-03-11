import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from '../App';
import { CompositeScreenProps } from '@react-navigation/native';

type Props = CompositeScreenProps <
  BottomTabScreenProps<TabParamList, 'List'>,
  NativeStackScreenProps<RootStackParamList>
>;

//type Props = BottomTabScreenProps<TabParamList, 'List'>;

const ITEMS = [
  { id: 1, title: 'Apple', subtitle: '蘋果' },
  { id: 2, title: 'Banana', subtitle: '香蕉' },
  { id: 3, title: 'Cherry', subtitle: '櫻桃' },
  { id: 4, title: 'Durian', subtitle: '榴槤' },
  { id: 5, title: 'Elderberry', subtitle: '接骨木莓' },
  { id: 6, title: 'Fig', subtitle: '無花果' },
  { id: 7, title: 'Grape', subtitle: '葡萄' },
  { id: 8, title: 'Honeydew', subtitle: '蜜瓜' },
];

//type Item = typeof ITEMS[0];
type Item = {
  id: number;
  title: string;
  subtitle: string;
};

export default function ListScreen({ navigation }: Props) {
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('Detail', { id: item.id, title: item.title })}
    >
      <View style={styles.rowContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={ITEMS}
      keyExtractor={item => item.id.toString()}
      //renderItem={renderItem}
      renderItem={({ item }) => (
        <FruitRow 
          item={item} 
          onPress={() => navigation.navigate('Detail', { id: item.id, title: item.title })}
        />
      )}
      ItemSeparatorComponent={() => <ItemSeparatorFancy />}
      contentContainerStyle={styles.list}
    />
  );
}

function FruitRow({ item, onPress }: { item: Item; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.rowContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

function ItemSeparator() {
  return (
    <View style={styles.separator} />
  );
}

function ItemSeparatorFancy() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: '#E5E5EA' }} />
        <Text style={{ paddingHorizontal: 8, color: '#999' }}>•</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: '#E5E5EA' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  rowContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  chevron: {
    fontSize: 20,
    color: '#C7C7CC',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginLeft: 16,
  },
});