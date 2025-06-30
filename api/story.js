const igRequest = require('./helper.js');
module.exports = (req, res) => {
  const username = req.query.username;
  if (!username) return res.json({ error: 'Missing username' });

  const infoUrl = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`;
  igRequest(infoUrl, (err, info) => {
    if (err || !info?.data?.user?.id) return res.json({ error: 'Failed to get user ID', detail: info });
    const userId = info.data.user.id;
    const reelUrl = `https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=${userId}`;
    igRequest(reelUrl, (err2, result) => {
      if (err2) return res.json(err2);
      res.json(result);
    });
  });
};