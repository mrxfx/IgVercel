const igRequest = require('./helper.js');

module.exports = (req, res) => {
  const username = req.query.username;
  if (!username) return res.json({ error: 'Missing username' });

  const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
  igRequest(url, (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
};
