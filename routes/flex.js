const express = require('express');
const router = express.Router();
const Flex = require('../models/flex.js');

// สร้างใหม่
router.post('/', async (req, res) => {
  const data = new Flex(req.body);
  await data.save();
  res.send({ message: '✅ Flex saved' });
});

// ดูทั้งหมด
router.get('/', async (req, res) => {
  const all = await Flex.find();
  res.send(all);
});

module.exports = router;