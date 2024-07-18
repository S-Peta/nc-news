const db = require("../db/connection")

function listArticles(sort_by = "created_at", order = "desc", topic) {
  const validOptions = ["author", "title", "created_at"];
  const validOrders = ["asc", "desc"];

  if (!validOptions.includes(sort_by) || !validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: 'Invalid input' });
  }

  const topicPromise = topic ? db.query('SELECT slug FROM topics') : Promise.resolve({ rows: [] });

  return topicPromise.then(({ rows }) => {
    const validTopics = rows.map(row => row.slug);

    if (topic && !validTopics.includes(topic)) {
      return Promise.reject({ status: 400, msg: 'Invalid topic' });
    }

    let queryStr = `
      SELECT
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
    `;

    const queryParams = [];
    if (topic) {
      queryStr += ` WHERE articles.topic = $1`;
      queryParams.push(topic);
    }

    queryStr += `
      GROUP BY articles.article_id
      ORDER BY ${sort_by} ${order.toUpperCase()}
    `;

    return db.query(queryStr, queryParams).then((articlesData) => {
      return articlesData.rows;
    });
  });
}

module.exports = listArticles;



  function selectArticle(article_id) {
  const queryStr = `
    SELECT
      articles.article_id,
      articles.title,
      articles.topic,
      articles.author,
      articles.body,
      articles.created_at,
      articles.votes,
      articles.article_img_url,
      COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;
  `;

  return db.query(queryStr, [article_id])
    .then((result) => {
      return result.rows[0];
    });
}


function updateArticle(inc_votes, article_id) {
    return db.query( `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *`, [inc_votes, article_id])
    .then(({rows}) => {
      return rows[0]
    })
  }


module.exports = {listArticles, selectArticle, updateArticle};
