const jwt = require("jsonwebtoken");
const User = require("./users-model");
const JWT_SECRET = process.env.JWT_SECRET || "shh";

const checkIdExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.getUserById(id);
    if (user.length > 0 || user.username) {
      req.user = user;
      next();
    } else {
      next({ status: 404, message: "user id does not exist" });
    }
  } catch (err) {
    next(err);
  }
};

const checkLoginBody = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({ status: 400, message: "Please include username and password" });
  } else if (typeof username !== "string" || typeof password !== "string") {
    next({ status: 400, message: "Username and password must be strings" });
  } else {
    const userTrimmed = username.trim();
    const passTrimmed = password.trim();
    req.login = { username: userTrimmed, password: passTrimmed };
    try {
      const user = await User.getUserBy({ username: req.login.username });
      if (user) {
        req.user = user;
        next();
      } else {
        next({
          status: 401,
          message: `user with username ${req.login.username} does not exist`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
};

const checkRegisterBody = async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    next({
      status: 400,
      message: "register must include username, password, email",
    });
  } else {
    next();
  }
};

const categoryNameToId = async (req, res, next) => {
  try {
    const category_id = await User.getCategoryByName(req.body.category);
    req.category = category_id.toString();
    next();
  } catch (err) {
    next({
      status: 400,
      message:
        "not a valid category. Must be 'Animal Products', 'Beans', 'Cereals', 'Fruits', 'Peas', 'Roots & Tubers', 'Seeds & Nuts', or 'Vegetables'",
    });
  }
};

const checkIfSession = (req, res, next) => {
  if (req.session.user) {
    const token = buildToken(req.session.user);
    res.status(200).json({
      message: `Hey ${req.session.user.username}, session already exists`,
      token: token,
      user: req.session.user,
    });
  } else {
    console.log("no session");
    next();
  }
};

const buildToken = (user) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "2d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
};
module.exports = {
  categoryNameToId,
  checkIdExists,
  checkLoginBody,
  checkRegisterBody,
  checkIfSession,
};
