import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import bcrypt from "bcryptjs";
import User from "./models/user";
import config from "./config";

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

const configurePassportMiddlewares = () => {
  //Adding the Authentication "Local" strategy middleware:
  passport.use(
    new LocalStrategy(
      //username and password come from the "login" controller. The user enter these values and its intercepted by this middleware
      async (username: string, password: string, done) => {
        console.log("LocalStrategy->password=", password);
        console.log("LocalStrategy->username=", username);
        try {
          const user = await User.findOne({ username }).exec();

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              password,
              user.password
            );

            if (isPasswordCorrect) {
              return done(null, user);
            }

            return done(null, false, { message: "Incorrect password" });
          }
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
        jwtFromRequest: (req) => {
          return req.cookies.jwt;
        }, //We take the 'token' from the cookies
        secretOrKey: config.jwtSecretToken, //This secret token is needed so the JWTStrategy would be able to verify the encrypted password
        //"audience:"yoursite.net" property can be added in order to limit the callers addresses to only the permited one.
      },
      (jwtPayload, done) => {
        //We check if the token has expired
        if (Date.now() > jwtPayload.expires) {
          return done("jwt expired");
        }

        return done(null, jwtPayload);
      }
    )
  );
};

export { configurePassportMiddlewares };
