const axios = require('axios');

const LINE_HEADER = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`
};

exports.replyText = (replyToken, text) => {
  return axios.post('https://api.line.me/v2/bot/message/reply', {
    replyToken,
    messages: [{ type: 'text', text }]
  }, { headers: LINE_HEADER });
};

exports.pushFlex = (to, flexContent) => {
  return axios.post('https://api.line.me/v2/bot/message/push', {
    to,
    messages: [{ type: 'flex', altText: 'Flex message', contents: flexContent }]
  }, { headers: LINE_HEADER });
};