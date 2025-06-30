const https = require('https');

function igRequest(url, callback) {
  const options = {
    headers: {
      'User-Agent': process.env.USER_AGENT,
      'Cookie': 'sessionid=' + process.env.SESSION_ID
    }
  };

  https.get(url, options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        callback(null, json);
      } catch (e) {
        callback({ error: 'Invalid JSON', raw: data });
      }
    });
  }).on('error', (err) => {
    callback({ error: err.message });
  });
}

module.exports = igRequest;
