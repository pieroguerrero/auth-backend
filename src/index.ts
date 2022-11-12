import app from "./app";
import { connectToDatabase } from "./database";

const main = () => {
  connectToDatabase();

  app.listen(app.get("port"), () => {
    console.log("Server listening on port:", app.get("port"));
  });
};

main();
