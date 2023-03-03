import { useState } from "react";
//Import keys.json from lib
import keys from "../lib/secrets/keys.json";

export default function App() {
  // const [file, setFile] = useState<any>(null);
  // const [publicUrl, setPublicUrl] = useState<any>(null);
  // async function handleSubmit(event: any) {
  //   console.log("AHHHHHHH");
  //   event.preventDefault();
  //   console.log("file", file);
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   const response = await fetch("/api/fileUpload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await response.json();
  //   setPublicUrl(data.publicUrl);
  // }
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type="file"
  //       onChange={(event) => {
  //         if (event.target.files) setFile(event.target.files[0]);
  //       }}
  //     />
  //     <button type="submit">Submit</button>
  //   </form>
  // );

  const [number, setNumber] = useState(0);
  const [result, setResult] = useState(null);

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
