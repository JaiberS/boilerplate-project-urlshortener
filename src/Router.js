const Router = require('express');
const shorturlController = require('./controllers/ShortUrlController');

const router = new Router();

// health endpoint 
router.get("/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

router.post('/api/shorturl', shorturlController.shorturl);
router.get('/api/shorturl/:shorturl', shorturlController.redirection);

module.exports = router;
