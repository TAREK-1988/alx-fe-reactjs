import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ border: "1px solid #ddd", padding: "12px", margin: "10px", borderRadius: "8px" }}>
      <p style={{ fontWeight: "bold" }}>Current Count: {count}</p>

      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default Counter;


