'use strict';

const jwt = require('jwt-simple');

function encryptBadge(rawBadgeId) {
  const currentTimestamp = new Date().getTime();
  return jwt.encode({ sub: rawBadgeId, iat: currentTimestamp }, process.env.BADGE_ID_SECRET_KEY);
}

exports.handler = (event, context, callback) => {
  if (event.httpMethod === 'POST' && event.body) {
    const json = JSON.parse(event.body);
    const rawBadgeId = json.badgeId;

    const encryptedBadgeId = encryptBadge(rawBadgeId);

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: "Successfully encrypt the badge id.",
        rawBadgeId: rawBadgeId,
        encryptedBadgeId: encryptedBadgeId,
      })
    });
  } else {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'No input warning',
      }),
    });
  }
};
