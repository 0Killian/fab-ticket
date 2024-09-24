const auth = require('./auth');


async function get_login(req, res) {
  res.render('login', { config: req.app.get('config') });
}

async function api_login(req, res) {
  const { username, password } = req.body;

  let user = await auth.authenticate(req.app.get('config'), username, password);
  if (user == null) {
    res.status(401).json({message: 'Incorrect username or password'});
  } else {
    res.json({token: auth.createToken(req.app.get('config'), user)});
  }
}

module.exports.setup = (app) => {
  app.get('/login', get_login);
  app.get('/api/login', api_login);
}
