const express = require('express');
const router = express.Router();
const layout = require('../views/layout');
const addPage = require('../views/addPage');
const { Page } = require('../models');
const wikiPage = require('../views/wikipage');
const mainPage = require('../views/main');

router.get('/add', async (req, res) => {
  await res.send(addPage());
});

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    await res.send(mainPage(pages));
  } catch (error) {
    next(error);
  }
});

router.get('/:slug', async (req, res, next) => {
  const page = await Page.findOne({
    where: {
      slug: req.params.slug
    }
  });
  console.log(page);
  res.send(wikiPage(page, null));
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status
  });
  try {
    console.log(page);
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
