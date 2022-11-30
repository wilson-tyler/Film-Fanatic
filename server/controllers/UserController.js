const db = require('../Model');
const UserController = {};

UserController.getProfileData = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userData = await db.query(`SELECT * FROM profile WHERE id=${id}`);
    res.locals.profile = userData.rows;
    next();
  } catch (err) {
    next({
      log: 'Caught in UserController.getProfileData middleware function.',
      message: { err: err }
    });
  }
}

UserController.getLoginData = async (req, res, next) => {
  const { code } = req.query;

  if (!code) {
    next({
      log: 'Error caught in UserController.getLoginData handler',
      message: {err: 'Error caught in UserController.getLoginData handler'}
    })
  }
  
  next();
 }

module.exports = UserController;