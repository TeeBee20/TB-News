\c nc_news_test

-- SELECT * FROM articles JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id;

SELECT comments.* FROM comments LEFT JOIN articles ON comments.article_id = articles.article_id;