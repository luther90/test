const router = require('express').Router()
const articlesController = require('../controllers/articles.controller')

router.get('/', articlesController.getAllArticles)
router.get('/:id', articlesController.getOneArticle)

module.exports = router