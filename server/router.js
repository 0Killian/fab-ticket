const auth = require('./auth');

async function api_login(req, res) {
  const { username, password } = req.body;

  let user = await auth.authenticate(req.app.get('config'), username, password);
  if (user == null) {
    res.status(401).json({message: 'Incorrect username or password'});
  } else {
    res.json({token: auth.createToken(req.app.get('config'), user)});
  }
}

async function index(req, res) {
  res.render('index', {subject: 'Welcome', name: 'John Doe', link: 'https://example.com/unsubscribe'});
}

module.exports.setup = (app) => {
  app.post('/api/login', api_login);
  app.get('/', index);
}
