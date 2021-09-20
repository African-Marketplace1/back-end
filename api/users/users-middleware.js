const User = require("./users-model");

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
    next();
  }
};

const categoryNameToId = async (req, res, next) => {
  try {
    const category_id = await User.getCategoryByName(req.body.category);
    console.log(category_id);
    req.category = category_id.toString();
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { categoryNameToId, checkIdExists, checkLoginBody };
