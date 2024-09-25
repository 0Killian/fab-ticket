const auth = require('./auth');
let router = require('express').Router();

let adminRouter = require('express').Router();

adminRouter.get('/dashboard', (req, res) => {
  res.render('dashboard', {});
});

adminRouter.get('/inventory', (req, res) => {
  res.render('inventory', {});
});


router.get('/tickets', auth.isAuthenticated, (req, res) => {
  res.render('tickets', {});
});

router.get('/borrows', auth.isAuthenticated, (req, res) => {
  res.render('borrows', {});
});

router.use('/admin', auth.isAuthenticated, auth.isAdmin, adminRouter);

router.get('/login', (req, res) => {
  res.render('login', {title: "Login"});
});

module.exports = router;
