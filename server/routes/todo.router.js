const express = require('express');
const router = express.Router();
const { todo } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const todoDate = await todo.findAll();
    res.json({ todoDate });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/todo', async (req, res) => {
  try {
    console.log(req.body);
    const { description, check } = req.body;
    const todoItem = await todo.create({
      description,
      check,
    });
    res.json({ todoItem });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.put('/todo/:params', async (req, res) => {
  try {
    console.log(1111);
    const { params } = req.params;
    const { check } = req.body;
    await todo.update({ check: check }, { where: { id: params } });
    const resObj = await todo.findOne({ where: { id: params } });
    // console.log(resObj, 11111);
    res.json({ resObj });
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:params', async (req, res) => {
  console.log(123);
  const { params } = req.params;
  const obj = await todo.findOne({ where: { id: params } });
  await todo.destroy({ where: { id: params } });
  res.json({ message: 'success', obj });
});

module.exports = router;
