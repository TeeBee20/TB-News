\c nc_news_test

  
SELECT articles.*, 
  COUNT(comment_id) :: INT AS comment_count 
  FROM articles 
  LEFT JOIN comments 
  ON comments.article_id = articles.article_id
  WHERE articles.article_id = 5
  GROUP BY articles.article_id


  SELECT * FROM articles WHERE article_id = 5;