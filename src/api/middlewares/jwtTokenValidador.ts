import passport from "passport";

const getJwtTokenValidador = () => {
  return passport.authenticate("jwt", { session: false });
};

export { getJwtTokenValidador };
