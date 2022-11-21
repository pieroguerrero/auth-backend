const UtilConstants = Object.freeze({
  TOKEN_LINK_NAME: "[TOKEN_LINK]",
  CONFIRMATION_EMAIL_HTML_TEMPLATE:
    "<div><h3>" +
    new Date().toString() +
    ' The intend of this email is to verify your account.</h3><a href="[TOKEN_LINK]">Click here to confirm you email.</a></div>',
});

export { UtilConstants };
