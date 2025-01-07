import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Item from "./component/Item";
import ItemForm from "./component/ItemForm";

interface Item {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

  const handleAddOrUpdateItem = (id: string, name: string) => {
    if (id) {
      setItems(
        items.map((item) => (item.id === id ? { ...item, name } : item))
      );
    } else {
      setItems([...items, { id: uuidv4(), name }]);
    }
    setEditingItem(undefined);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditItem = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setEditingItem(item);
    }
  };

  return (
    <div className='container'>
      <h1>CRUD App</h1>
      <ItemForm onSave={handleAddOrUpdateItem} editingItem={editingItem} />
      <div className='item-list'>
        {items.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            onDelete={handleDeleteItem}
            onEdit={handleEditItem}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
