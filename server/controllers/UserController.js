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


module.exports = UserController;