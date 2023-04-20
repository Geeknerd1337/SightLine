import { useState } from "react";

interface SandboxResponse {
  result: number;
  analysis: Record<string, any>;
}

export default function Sandbox() {
  const [result, setResult] = useState<number | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleIncrement = async () => {
    try {
      const formData = new FormData();
      formData.append("videoFile", videoFile as File);

      const response = await fetch(
        "https://kzv0hg8e9a.execute-api.us-east-1.amazonaws.com/default/counterFunction",
        {
          method: "POST",
          headers: {
            "x-api-key": process.env.AWS_KEY ? process.env.AWS_KEY : "",
            "Content-Type": "multipart/form-data",
          },
          body: formData,
          mode: "cors",
        }
      );

      const data: SandboxResponse = await response.json();
      const datainMb = data.result / 1000000;
      setResult(datainMb);
      console.log(data.analysis);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Perform Video Analysis</h1>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files && e.target.files[0])}
      />
      <button onClick={handleIncrement} disabled={!videoFile}>
        Perform Analysis
      </button>
      {result !== null && <p>Result: {result}mb</p>}
    </div>
  );
}
