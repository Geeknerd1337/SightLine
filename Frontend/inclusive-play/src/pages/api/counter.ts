import { spawn } from "child_process";

export default function handler(req: any, res: any) {
  const { number } = req.query;
  const num = parseInt(number);

  //Print the current path
  console.log("A----------A");
  console.log("Current path: " + process.cwd());
  console.log("A----------A");

  const pythonProcess = spawn("python3", ["src/lib/counter.py"]);
  pythonProcess.stdin.write(JSON.stringify({ num }) + "\n");

  let data = "";
  pythonProcess.stdout.on("data", (chunk) => {
    data += chunk.toString();
  });

  pythonProcess.stdout.on("end", () => {
    console.log("----------");
    console.log(data);
    console.log("----------");
    const response = JSON.parse(data);
    res.status(200).json(response);
  });

  pythonProcess.stderr.on("data", (err) => {
    console.error(err.toString());
    res.status(500).send("An error occurred");
  });

  pythonProcess.stdin.end();
}
