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

  if (!code) {
    next({
      log: 'Error caught in UserController.getLoginData handler',
      message: {err: 'Error caught in UserController.getLoginData handler'}
    })
  }

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
 }

 UserController.approveAccessToken = async (req, res, next) => {
   const { access_token } = res.locals.data;

   request
   .get('https://api.github.com/user')
   .set({ 
    'Authorization': `Bearer ${access_token}`,
    'User-Agent': 'Film Fanatic',
    'Accept': "application/vnd.github.v3+json" 
  })
   .then(result => {
     console.log(result.body)
     res.locals.user = result.body;
     next()
   })
 }

 UserController.createUser = async (req, res, next) => {
   const { login, name, id } = res.locals.user;
   const values = [login, name];

   await db.query(`INSERT INTO profile (UserName, Name) VALUES ($1, $2)`, values);
   res.cookie('code', res.locals.code);
   next();
 }

module.exports = UserController;