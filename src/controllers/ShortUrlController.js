const URL = require("url").URL;
const dns = require("dns");

class ShorturlController {

  async shorturl(req, res) {
    console.log(`ShorturlController.shorturl : REQUEST--> ${JSON.stringify(req.body)}`);
    const url = req.body.url;
    try {
      const checkUrl = new URL(url);
      dns.lookup(checkUrl.hostname, (err) => {
        if (err) {
          res.json({ error: 'Invalid URL' });
        } else {
          res.json({ 
            original_url : url, 
            short_url : Buffer.from(url).toString('base64')
          });
        }
      })

    } catch (error) {
      console.error(`error:${error}`);
      res.status(error.statusCode || 400).json({ error: 'Invalid URL' });
    }
  }

  async redirection(req, res) {
    console.log(`ShorturlController.redirection : REQUEST--> ${JSON.stringify(req.params)}`);
    try {
      res.redirect(Buffer.from(req.params.shorturl, 'base64').toString('ascii'));
    } catch (error) {
      console.error(`error:${error}`);
      res.status(error.statusCode || 400).json({ error: 'Invalid URL' });
    }
  }
}

module.exports = new ShorturlController();
