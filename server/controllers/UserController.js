const db = require('../Model');
const request = require('superagent');
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

  try {
    request
      .post('https://github.com/login/oauth/access_token')
      .send({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code
      })
      .set('Accept', 'application/json')
      .then(result => {
        res.locals.data = result.body;
        res.locals.code = code;
        next();
      })
  } catch (err) {
    next({
      log: 'Error caught in UserController.getLoginData handler',
      message: { err: 'Error caught in UserController.getLoginData handler' }
    })
  }
}

UserController.approveAccessToken = async (req, res, next) => {
  const { access_token } = res.locals.data;

  try {
  request
    .get('https://api.github.com/user')
    .set({
      'Authorization': `Bearer ${access_token}`,
      'User-Agent': 'Film Fanatic',
      'Accept': "application/vnd.github.v3+json"
    })
    .then(result => {
      res.locals.user = result.body;
      next()
    })
  } catch (err) {
    next({
      log: 'Error caught in UserController.approveAccessToken handler',
      message: {err: 'Error caught in UserController.approveAccessToken handler'}
    })
  }
}

UserController.createUser = async (req, res, next) => {
  const { login, name } = res.locals.user;
  const { code } = res.locals;
  const values = [login, name, code];

  const user = await db.query(`SELECT * FROM profile WHERE username='${login}'`)

  if (user.rows.length === 1) {
    await db.query(`UPDATE profile SET SessionCookie='${code}' WHERE id=${user.rows[0].id}`);
  } else {
  await db.query(`INSERT INTO profile (UserName, Name, SessionCookie) VALUES ($1, $2, $3)`, values);
  }
  res.cookie('code', res.locals.code);
  next();
}

UserController.verifyUser = async (req, res, next) => {
  const { code } = req.params;

  try {
    const verifiedUser = await db.query(`SELECT * FROM profile WHERE sessioncookie='${code}'`);
    res.locals.user = verifiedUser.rows;
    next();
  } catch (err) {
    next({
      log: 'Error caught in UserController.verifyUser middleware handler',
      message: { err: 'Caught in UserController.verifyUser middleware handler' }
    })
  }

}

module.exports = UserController;