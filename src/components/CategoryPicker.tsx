import { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal, FlatList,
  StyleSheet, Platform, ActionSheetIOS
} from 'react-native';
import { Category } from '../types';

type Props = {
  categories: Category[];
  selectedId: string;
  onSelect: (category: Category) => void;
};

export function CategoryPicker({ categories, selectedId, onSelect }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedCategory = categories.find(c => c.id === selectedId);

  const showPicker = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...categories.map(c => c.name), 'Cancel'],
          cancelButtonIndex: categories.length,
        },
        (index) => {
          if (index < categories.length) {
            onSelect(categories[index]);
          }
        }
      );
    } else {
      setModalVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={showPicker}
      >
        <Text style={styles.selectedText}>
          {selectedCategory?.name || 'Select Category'}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </TouchableOpacity>

      {/* Android Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Category</Text>
          <FlatList
            data={categories}
            keyExtractor={c => c.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  onSelect(item);
                  setModalVisible(false);
                }}
              >
                <Text style={[
                  styles.modalItemText,
                  item.id === selectedId && styles.selectedItem
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  selectedText: {
    color: '#666',
    fontSize: 16,
  },
  chevron: {
    color: '#C7C7CC',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 32,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalItem: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalItemText: {
    fontSize: 16,
  },
  selectedItem: {
    color: '#007AFF',
    fontWeight: '600',
  },
  cancelButton: {
    margin: 16,
    padding: 14,
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#FF3B30',
    fontWeight: '600',
  },
});