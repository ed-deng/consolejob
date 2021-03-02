const express = require('express');
const router = express.Router();

router.post('/user', (req, res) => {
  res.status(200).json({});
});

router.put((req, res) => {
  res.send();
});

module.exports = router;
