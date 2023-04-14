import { useState } from "react";
import keys from "../lib/secrets/keys.json";

export default function Sandbox() {
  const [result, setResult] = useState(null);
  const [number, setNumber] = useState(0);

  const handleIncrement = async () => {
    try {
      console.log(JSON.stringify({ number }));
      const response = await fetch(
        "https://kzv0hg8e9a.execute-api.us-east-1.amazonaws.com/default/counterFunction",
        {
          method: "POST",
          headers: {
            "x-api-key": keys["aws-counter-function-key"],
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ number }),
          mode: "cors",
        }
      );

      const data = await response.json();
      console.log(data);
      setNumber(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Increment Number</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />
      <button onClick={handleIncrement}>Increment</button>
      <p>Result: {result}</p>
    </div>
  );
}
