\c nc_news_test

SELECT comments.* FROM comments 
    LEFT JOIN articles 
    ON articles.article_id = comments.article_id
    WHERE comments.article_id = 1;