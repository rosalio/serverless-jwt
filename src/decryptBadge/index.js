'use strict';

const jwt = require('jwt-simple');

function decryptBadge(encryptedBadgeId) {
  return jwt.decode(encryptedBadgeId, process.env.BADGE_ID_SECRET_KEY);
}

exports.handler = (event, context, callback) => {
  if (event.httpMethod === 'POST' && event.body) {
    const json = JSON.parse(event.body);
    const encryptedBadgeId = json.encryptedBadgeId;

    const rawBadgeId = decryptBadge(encryptedBadgeId);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully decrypt the badge id.",
        encryptedBadgeId: encryptedBadgeId,
        rawBadgeId: rawBadgeId,
      })
    });
  } else {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'No input',
      }),
    });
  }
};
