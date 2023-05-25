import { useState } from "react";
// import { useSinglePrismicDocument } from "@prismicio/react";
import "./App.css";
import FetchExample from "./components/FetchExample/FetchExample.jsx";

export default function App() {
  // const state = useState();
  // const input = state[0];
  // const setInput = state[1];
  // const [document, { state }] = useSinglePrismicDocument("homepage");
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

  const markDone = (id) => {
    const list = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }

      return todo;
    });

    setTodos(list);
  };

  return (
    <div>
      <FetchExample></FetchExample>
      <input type="text" onInput={(e) => setInput(e.target.value)} />
      <h1>TODO: {input}</h1>
      {/* {state === "loaded" && <img src={document.data.hero_image.url} alt="" />} */}
      <button onClick={handleClick}>Add todo</button>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              style={{
                listStyle: "none",
                textDecoration: todo.completed ? "line-through" : "",
              }}
            >
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onChange={() => markDone(todo.id)}
              />
              {todo.task}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
