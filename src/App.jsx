import { useState } from "react";
import "./App.css";

export default function App() {
  // const state = useState();
  // const input = state[0];
  // const setInput = state[1];

  const [input, setInput] = useState("Fare la spesa");
  const [todos, setTodos] = useState([]);

  const handleClick = () => {
    const id = todos.length + 1;
    setTodos((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        completed: false,
      },
    ]);
  };

  return (
    <div>
      <input type="text" onInput={(e) => setInput(e.target.value)} />
      <h1>TODO: {input}</h1>
      <button onClick={() => handleClick()}>Add todo</button>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.completed} />
              {todo.task}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
