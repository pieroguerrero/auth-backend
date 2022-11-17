# auth-restful-backend

A ready-to-use RESTful backend with APIs for: Signup with email verification, Signin and protection of routes

Uses

- Advanced project folder structure
  -  <code></code>
- Passport-local for Authentication. Other authentication methods can be added.
- Passport-jwt for the routes access authorization.
- The token can be sent via Authorization key in the header or via Cookies
- Allow cross-origin- resourse sharing (CORS)
- The email validation is using...

```
📦src
 ┣ 📂api -> aaaa
 ┃ ┣ 📂controllers
 ┃ ┣ 📂Interfaces
 ┃ ┣ 📂middlewares
 ┃ ┣ 📂models
 ┃ ┣ 📂routers
 ┃ ┣ 📂services
 ┃ ┗ 📂util
 ┣ 📂config
 ┣ 📂public
 ┗ 📜index.ts
```

