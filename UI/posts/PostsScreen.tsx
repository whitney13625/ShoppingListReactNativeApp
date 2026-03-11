import { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, StyleSheet, 
  ActivityIndicator, TouchableOpacity 
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootStackParamList, TabParamList } from '../../App';
import { CompositeScreenProps } from '@react-navigation/native';

type Post = {
  id: number;
  title: string;
  body: string;
};

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Posts'>,
  NativeStackScreenProps<RootStackParamList>
>;

//type Props = BottomTabScreenProps<TabParamList, 'Posts'>;

export default function PostsScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data: Post[] = await response.json();
      setPosts(data);
    } catch (e) {
      setError('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPosts}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('Detail', { id: item.id, title: item.title })}
        >
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.body} numberOfLines={2}>{item.body}</Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
  row: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
});