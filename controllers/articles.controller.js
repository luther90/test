const ArticlesModel = require('../models/articles.model')
const axios = require('axios')



// Récupération des données de l'API et enregistrement dans la base de données
axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(async response => {
        const articles = response.data;


        for (const article of articles) {
            // Vérifier si la publication existe déjà dans la base de données
            const existingPost = await ArticlesModel.findOne({ id: article.id });

            if (!existingPost) {
                // Enregistrement des publications dans la base de données
                articles.forEach(article => {
                    const newArticle = new ArticlesModel({
                        userId: article.userId,
                        id: article.id,
                        title: article.title,
                        body: article.body
                    });
                    newArticle.save()
                        .then(() => console.log('Publication enregistrée avec succès'))
                        .catch(error => console.error('Erreur lors de l\'enregistrement de la publication :', error));
                });
            }
        }


    })
    .catch(error => {
        console.error('Erreur lors de la récupération des publications depuis l\'API :', error);
    });



module.exports.getAllArticles = (async (req, res) => {
    try {
        const docs = await ArticlesModel.find()
        res.status(200).json(docs)
    }
    catch (err) {
        res.status(400).json(err.message)
    }
})

module.exports.getOneArticle = (async (req, res) => {

    const docs = await ArticlesModel.find()
    try {
        docs.forEach(doc => {
            if (doc.id == req.params.id)
                res.status(200).json(doc);
        });
    }
    catch (err) {
        res.status(400).json(err.message)
    }

})