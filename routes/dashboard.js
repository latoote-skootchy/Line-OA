const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { pushFlex } = require('../services/lineService');
const Flex = require('../models/Flex.js');

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post('/broadcast/:flexId', async (req, res) => {
  const users = await User.find({ status: 'Pending' });
  const flex = await Flex.findById(req.params.flexId);

  const flexContent = {
    type: 'bubble',
    hero: {
      type: 'image',
      url: flex.imageUrl,
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
      action: { type: 'uri', uri: flex.primaryUrl }
    },
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        { type: 'text', text: flex.title, weight: 'bold', size: 'lg' },
        { type: 'text', text: flex.description, size: 'sm', wrap: true }
      ]
    },
    footer: {
      type: 'box',
      layout: 'horizontal',
      contents: [
        { type: 'button', style: 'primary', height: 'sm', action: { type: 'uri', label: 'ดูรายละเอียด', uri: flex.primaryUrl } },
        { type: 'button', style: 'link', height: 'sm', action: { type: 'uri', label: 'ซื้อเลย', uri: flex.secondaryUrl } }
      ]
    }
  };

  for (let user of users) {
    await pushFlex(user.userId, flexContent);
    await User.findByIdAndUpdate(user._id, { status: 'Done' });
  }

  res.send({ message: '✅ Broadcast sent' });
});

module.exports = router;