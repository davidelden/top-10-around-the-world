const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:country', function(req, res) {
  let country = req.params.country;
  let rootUrl = process.env.LASTFM_API_ROOT_URL;
  let apiKey = process.env.LASTFM_API_KEY;
  let url = `${rootUrl}?method=geo.gettoptracks&country=${country}&limit=10&api_key=${apiKey}&format=json`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

module.exports = router;