import React, { useState } from "react";

interface ItemProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string) => void;
}

const Item: React.FC<ItemProps> = ({ id, name, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(id, newName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className='item'>
      {isEditing ? (
        <input
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      ) : (
        <span>{name}</span>
      )}
      <button className='edit' onClick={handleEdit}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Item;
