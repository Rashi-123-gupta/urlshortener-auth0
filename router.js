const express = require('express');
const router = express.Router();
const connectEnsureLogin = require('connect-ensure-login');
const passport = require('passport');
const app = express()
const User = require('../userDetails')
const ShortURL = require('../models/url')

// GET Routes

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/secret', connectEnsureLogin.ensureLoggedIn(), (req, res) =>
  res.render('secret')
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/main');
});

router.get('/short', async (req, res) => {
  const allData = await ShortURL.find({}, { _id: 0 })
  res.render('index', { shorturls: allData })
})

router.get('/:shortid', async (req, res) => {
  const shortid = req.params.shortid
  const data = await ShortURL.findOne({ short: shortid })

  if (!data) {
    return res.sendStatus(404)
  }
  data.clicks++
  await data.save()
  res.redirect(data.full)
})

// POST Routes 
const bcrypt = require('bcrypt');
router.post('/login', (request, response) => {
  const user = new User({
    userName: request.body.username,
    password: request.body.password,

  }); bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    user.save()

      .then(data => {
        console.log('Successfully created a new User');
      })
      .catch(error => {
        // you can send an error code here
      })

    response.redirect('/short')
  })
})
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/secret',
  }),
  (req, res) => {
    console.log(req.user);
  }
);
router.post('/short', async (req, res) => {

  const fullurl = req.body.fullurl
  console.log('URL requested : ', fullurl)
  const record = new ShortURL({
    full: fullurl
  })
  await record.save()
  res.redirect('/urlshortener')

})
module.exports = router;