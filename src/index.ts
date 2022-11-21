import configureApp from "./config/appConfig";
import { connectToDatabase } from "./config/databaseConfig";

const main = () => {
  connectToDatabase();

  const app = configureApp();
  app.listen(app.get("port"), () => {
    console.log("Server listening on port:", app.get("port"));
  });
};

main();
