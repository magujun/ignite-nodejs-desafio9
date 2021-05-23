import { app } from "./app";

const PORT = 3334;

app.listen(PORT, () => {
  console.log("⚡Node server is running on port " + PORT + " ⚡");
});
