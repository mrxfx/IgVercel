const igRequest = require('./helper.js');
module.exports = (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ error: 'Missing post URL' });

  const parts = url.split("/");
  const id = parts[parts.length - 2];
  const api = `https://i.instagram.com/api/v1/media/${id}/info/`;

  igRequest(api, (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
};