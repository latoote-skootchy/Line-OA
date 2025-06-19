const User = require('../models/userID');
const { replyText } = require('../services/lineService');

exports.handleWebhook = async (req, res) => {
  const event = req.body.events[0];
  const userId = event.source.userId;
  const message = event.message.text;

  try {
    await User.findOneAndUpdate(
      { userId },
      { lastMessage: message, lastActive: new Date() },
      { upsert: true }
    );
    await replyText(event.replyToken, `คุณพิมพ์ว่า: ${message}`);
  } catch (e) {
    console.log('❌ Webhook Error:', e);
  }

  res.send('OK');
};
