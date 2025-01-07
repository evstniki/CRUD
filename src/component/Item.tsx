import React from "react";

interface ItemProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const Item: React.FC<ItemProps> = ({ id, name, onDelete, onEdit }) => {
  return (
    <div className='item'>
      <span>{name}</span>
      <button className='edit' onClick={() => onEdit(id)}>
        Edit
      </button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Item;
