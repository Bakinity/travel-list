import { useState } from "react";

const App = () => {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItems = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  };

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItems} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
};

const Logo = () => {
  return <h1>🏝️ Far Away 🧳</h1>;
};

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  };
  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type='text'
        placeholder='Item...'
      ></input>
      <button>Add</button>
    </form>
  );
};

const PackingList = ({ items, onDeleteItem, onToggleItem }) => {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li>
      <input type='checkbox' value={item.packed} onChange={() => onToggleItem(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  if (!items.length)
    return (
      <p className='stats'>
        <em>Start adding items to your packing list🚀</em>
      </p>
    );
  return (
    <footer className='stats'>
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈"
          : `💼 You have ${numItems} items on your list,and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
};

export default App;
