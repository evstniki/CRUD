import React, { useEffect, useState } from "react";

interface ItemFormProps {
  onSave: (id: string, name: string) => void;
  editingItem?: { id: string; name: string };
}

const ItemForm: React.FC<ItemFormProps> = ({ onSave, editingItem }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editingItem ? editingItem.id : "", name);
    setName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Item name'
        required
      />
      <button type='submit'>{editingItem ? "Update" : "Add"}</button>
    </form>
  );
};

export default ItemForm;
