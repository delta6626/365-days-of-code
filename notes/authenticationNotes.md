**🔐 Learn Module 01 — Authentication & Firebase**

### What is Authentication?

Authentication is the process of verifying who a user is.  
It answers the question: _"Are you who you claim to be?"_

Common forms of authentication include:

- Logging in with email and password
- Signing in with social providers like Google or GitHub
- Biometric methods like Face ID or fingerprint scanning

---

### How Authentication Works (Conceptually)

1. A user enters their credentials (email, password, etc.)
2. The backend verifies this information
3. If valid, it provides the user with a digital “proof” — usually a token
4. This token is stored by the frontend
5. Every time the user accesses protected resources, the token is sent along to prove their identity

---

### Authentication vs Authorization

- **Authentication** confirms _who_ you are.
- **Authorization** confirms _what_ you're allowed to do.

You always authenticate first. Then, the app checks your authorization to allow or deny specific actions like viewing private data, editing settings, or accessing admin features.

---

### Token-Based vs Session-Based Authentication

#### Token-Based Authentication (e.g., JWT)

- Stateless — no user data is stored on the server
- After login, the server issues a token (like a JWT) to the client
- The client stores the token locally (e.g., in localStorage or memory)
- For each request, the client attaches the token, allowing the server to verify the user's identity
- Good for APIs and mobile apps
- Easier to scale because the server doesn’t need to keep track of user sessions

#### Session-Based Authentication

- Stateful — the server keeps track of logged-in users via sessions
- When the user logs in, the server creates a session and sends back a session ID stored in a browser cookie
- On every request, the browser automatically sends this cookie
- The server looks up the session to identify the user
- More traditional and secure for many web apps (cookies can be made secure, httpOnly, etc.)
- Slightly more complex to scale because session state must be stored server-side (in memory, database, etc.)

#### Why Token-Based Authentication is preferred

- In modern apps (React, SPA), tokens are preferred because:

  1. They’re stateless — no server memory required
  2. They scale better
  3. They’re frontend-friendly

---
