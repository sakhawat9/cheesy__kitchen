import jwt from "jsonwebtoken";

// A single fallback so the app still boots in local development without a
// JWT_SECRET set. Production deployments must provide one.
const SECRET = process.env.JWT_SECRET || "cheesy-kitchen-dev-secret";

export function signToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    SECRET,
    { expiresIn: "30d" },
  );
}

/** The subset of a user record that is safe to send to the browser. */
export function publicUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    user: user.user,
    img: user.img,
    facebook: user.facebook,
    linkedIn: user.linkedIn,
    twitter: user.twitter,
  };
}

/**
 * Verifies the Bearer token on a request.
 *
 * Returns the decoded payload, or writes the error response and returns null —
 * so a handler guards with `const auth = requireAuth(req, res); if (!auth) return;`.
 *
 * Replaces the old `isAuth` connect middleware, which called `next()` from
 * inside jwt.verify's callback: because that callback runs asynchronously, the
 * handler had already been invoked by then on some paths, and an invalid token
 * could produce two responses for one request.
 */
export function requireAuth(req, res) {
  const { authorization } = req.headers;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({ message: "You need to be signed in to do that" });
    return null;
  }

  try {
    return jwt.verify(authorization.slice(7), SECRET);
  } catch {
    res.status(401).json({ message: "Your session has expired — please sign in again" });
    return null;
  }
}

/** As requireAuth, but also requires the account to be an administrator. */
export function requireAdmin(req, res) {
  const auth = requireAuth(req, res);
  if (!auth) return null;

  if (!auth.isAdmin) {
    res.status(403).json({ message: "That action is restricted to administrators" });
    return null;
  }

  return auth;
}
