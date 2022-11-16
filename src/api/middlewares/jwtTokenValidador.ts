import passport from "passport";

const JwtTokenValidador = passport.authenticate("jwt", { session: false });

export { JwtTokenValidador };
