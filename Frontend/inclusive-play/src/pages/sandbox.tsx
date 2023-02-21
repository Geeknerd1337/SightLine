import { useState } from "react";
import multer from "multer";

export default function App() {
  const [file, setFile] = useState<any>(null);

  const [publicUrl, setPublicUrl] = useState<any>(null);

  async function handleSubmit(event: any) {
    console.log("AHHHHHHH");
    event.preventDefault();

    console.log("file", file);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/fileUpload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setPublicUrl(data.publicUrl);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(event) => {
          if (event.target.files) setFile(event.target.files[0]);
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
