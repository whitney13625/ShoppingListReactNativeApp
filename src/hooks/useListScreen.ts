import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useOptimisticUpdate } from './useOptimisticUpdate';

// Same idea in swift: func useListScreen<T: Identifiable>(...) where T.ID == String
export function useListScreen<T extends { id: string }>(
  fetchFn: () => Promise<{ data: T[] }>
) {
  const [items, setItems] = useState<T[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { execute } = useOptimisticUpdate(setItems);

  useFocusEffect(
    useCallback(() => {
      fetchFn()
      .then(response => setItems(response.data))
      .catch(error => {
                console.error(error.response?.status);
            });
    }, [])
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetchFn();
      setItems(response.data);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = (itemId: string, deleteFn: () => Promise<void>) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    execute(
      prev => prev.filter(i => i.id !== itemId),
      deleteFn,
      prev => [...prev, item]
    );
  };

  return { items, setItems, isRefreshing, handleRefresh, handleDelete, execute };
}