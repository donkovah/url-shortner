import app from "./app";
import { config } from "./config";
import { createLocalUrlTable } from "./domain/models/table";

createLocalUrlTable()
  .then(() => {
    console.log("Table Created Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(config.port ?? 3001);
console.log("Server started on port ${config.port} )");

export default app;
