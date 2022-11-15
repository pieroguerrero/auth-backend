const whitelist = ["http://localhost:3001", "https://web.postman.co/"];
const corsMiddleware = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origin: function (origin: any, callback: any) {
    console.log("origin=", origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

export default corsMiddleware;
