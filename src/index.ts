import app from "./config/appConfig";
import { connectToDatabase } from "./config/databaseConfig";

const main = () => {
  connectToDatabase();

  app.listen(app.get("port"), () => {
    console.log("Server listening on port:", app.get("port"));
  });
};

main();
