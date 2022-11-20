import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import bcrypt from "bcryptjs";
import User from "../api/models/user";
import config from "./envConfig";

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

const configurePassportMiddlewares = () => {
  //Adding the Authentication "Local" strategy middleware:
  passport.use(
    new LocalStrategy(
      //username and password come from the URL query parameters that are sent in the POST request. Take into considerationt that in the SignIn method we are passing the (request, response) at the end, so in this way the valies username and password can be taken.
      async (username: string, password: string, done) => {
        try {
          const user = await User.findOne({ username }).exec();

          if (!user) {
            return done("User does not exists.", null);
          }

          if (!user.verified) {
            return done("User not verified.", null);
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );

          if (!isPasswordCorrect) {
            return done("Incorrect password.", null);
          }

          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  //Adding the Authorization "JWT" strategy middleware:
  passport.use(
    new JWTStrategy(
      {
        //Option1: Take the 'token' from the cookies
        //Option 2: Take the 'token' from the header key: "Authorizarion"="Bearer <Token>"
        jwtFromRequest: config.tokenFromCookie
          ? (req) => req.cookies[config.jwtCookieName]
          : passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecretToken, //This secret token is needed so the JWTStrategy would be able to verify the encrypted password
        //"audience:"yoursite.net" property can be added in order to limit the callers addresses to only the permited one.
      },
      (jwtPayload, done) => {
        //Add other checkups in case there is something not good  and return done("Error message", null)
        //But the main idea here is to have all the information needed for the Router that are going to be served after this middleware is called. E.g: If we retrived all the user data from the database and store it in the "user" variable, then we should pass this variable to the done function in the form done(null, user). So in this way the subceding controller functions will get in the req.user property the 'user' object we just retrived.
        //Will be good idea to form the payload with all the information needed from the user so we dont have to call the databse in this callback

        return done(null, jwtPayload);
      }
    )
  );
};

export { configurePassportMiddlewares };
