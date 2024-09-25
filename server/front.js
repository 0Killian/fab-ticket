const auth = require('./auth');
let router = require('express').Router();

let adminRouter = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login', {title: 'Connexion' });
});

adminRouter.get('/dashboard', (req, res) => {
  res.render('dashboard', {layout: 'main', title: 'Dashboard' });
});

adminRouter.get('/inventory', (req, res) => {
  res.render('inventory', {layout: 'main', title: 'Inventaire' });
});


router.get('/tickets', auth.isAuthenticated, (req, res) => {
  res.render('tickets', {layout: 'main', title: 'Tickets'});
});

router.get('/borrows', auth.isAuthenticated, (req, res) => {
  res.render('borrows', {layout: 'main', title: 'Emprunts'});
});

router.use('/admin', auth.isAuthenticated, auth.isAdmin, adminRouter);

module.exports = router;

