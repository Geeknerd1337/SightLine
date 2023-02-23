import { useState } from "react";

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
  const [incremented, setIncremented] = useState(null);

  const handleIncrement = async () => {
    const response = await fetch(`/api/counter?number=${number}`);
    const data = await response.json();
    setIncremented(data.incremented);
    setNumber(data.incremented);
  };

  return (
    <div>
      <p>Number: {number}</p>
      {incremented && <p>Incremented: {incremented}</p>}
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
