require("jest-sorted");
const request = require("supertest")
const app = require("../app/app")
const seed = require("../db/seeds/seed")
const db = require("../db/connection")

const endpoints = require("../endpoints.json")
const articleData = require("../db/data/test-data/articles")
const commentData = require("../db/data/test-data/comments")
const topicData = require("../db/data/test-data/topics")
const userData = require("../db/data/test-data/users");
const articles = require("../db/data/test-data/articles");

beforeEach(() => seed({articleData, commentData, topicData, userData}));
afterAll(() => db.end());

describe('GET /api', () => {
  test('Return the content on the endpoints.json file', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({body}) => {
        expect(body.endpoints).toEqual(endpoints)
      })
  })
});

describe('GET /api/users', () => {
  test('responds with an array of all users', () => {
    return request(app)
    .get("/api/users")

    .expect(200)
    .then(({body}) => {
      const {users} = body

      expect(users).toHaveLength(4)
      users.forEach(user => {
        expect(typeof user.username).toBe("string");
        expect(typeof user.name).toBe("string");
        expect(typeof user.avatar_url).toBe("string");
      });
    })
  })
})

describe('GET /api/topics', () => {
  test('Responds with the topics data and status 200', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({body}) => {
        expect(body.topics).toEqual([
          { description: 'The man, the Mitch, the legend', slug: 'mitch' },
          { description: 'Not dogs', slug: 'cats' },
          { description: 'what books are made of', slug: 'paper' }
        ])
      })
  })
});

describe('GET /api/articles', () => {
  test('Responds with the articles data', () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body}) => {
        const {articles} = body;

        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("created_at", {descending: true});
        articles.forEach((article) => {
          expect(typeof article.author).toBe("string");
          expect(typeof article.title).toBe("string");
          expect(typeof article.article_id).toBe("number");
          expect(typeof article.topic).toBe("string");
          expect(typeof article.created_at).toBe("string");
          expect(typeof article.votes).toBe("number");
          expect(typeof article.article_img_url).toBe("string");
          expect(typeof article.comment_count).toBe("string");
        })
      })
  })

  test('Responds with the articles data sorted by the query', () => {
    return request(app)
    .get("/api/articles?sort_by=author")

    .expect(200)
    .then(({body}) => {
      const {articles} = body

      expect(articles).toBeSortedBy("author", {descending: true})
    })
  })

  test('Responds with the articles data sorted descending or ascending', () => {
    return request(app)
    .get("/api/articles?order=desc")

    .expect(200)
    .then(({body}) => {
      const {articles} = body

      expect(articles).toBeSortedBy("created_at", {descending: true})
    })
  })

  test('Responds with a 400 error when passed an invalid query', () => {
    return request(app)
    .get("/api/articles?sort_by=invalidColumn")
    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe('Invalid input');
    });
  })

  test('Responds with a 400 error when passed an invalid query', () => {
    return request(app)
    .get("/api/articles?sort_by=votes")

    .expect(400)
    .then(({body}) => {
      expect(body.msg).toBe('Invalid input');
    });
  })

  test('Responds with the articles data filtered by the topic query', () => {
    return request(app)
    .get("/api/articles?topic=mitch")
    .expect(200)
    .then(({body}) => {
      const {articles} = body

      expect(articles).toHaveLength(12);
      expect(articles).toBeSortedBy("created_at", {descending: true});
      articles.forEach((article) => {
        expect(article.topic).toBe("mitch");

      })
    })
  })

  test('Responds with a 404 error when passed topic has to article associated ', () => {
    return request(app)
    .get("/api/articles?topic=paper")
    .expect(404)
  })

  test('Responds with a 400 error if passed topic doenst exists', () => {
    return request(app)
    .get("/api/articles?topic=invalid")
    .expect(400)
  })

})

describe('GET /api/articles/:article_id', () => {
  test('Return the data with the right article', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({body}) => {
        const expectedBody =
          {
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            comment_count: "11"
          }

        expect(body.article).toEqual(expectedBody);
      })
  })

  test('Return comments 0 if no comments at the article', () => {
    return request(app)
      .get('/api/articles/4')
      .expect(200)
      .then(({body}) => {

        expect(body.article.article_id).toBe(4)
        expect(body.article.comment_count).toBe("0");
      })
  })

  test('Responds with a 404 error when passed an invalid id', () => {
    return request(app)
    .get('/api/articles/99')
    .expect(404)
  })

  test('Responds with a 400 error when passed an invalid data type', () => {
    return request(app)
    .get('/api/articles/notAnId')
    .expect(400)
  })
})

describe('GET /api/articles/:article_id/comments', () => {
  test('Return the data with the right article', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body}) => {
        const {comments} = body

        expect(comments).toHaveLength(11);
        expect(comments).toBeSortedBy("created_at", {descending: true});
        comments.forEach((comment) => {
          expect(typeof comment.body).toBe("string");
          expect(typeof comment.votes).toBe("number");
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.article_id).toBe("number");
          expect(typeof comment.created_at).toBe("string");
        })
      })
  })

  test('responds with a 404 error when passed an invalid id', () => {
    return request(app)
    .get('/api/articles/99/comments')
    .expect(404)
  })

  test('responds with a 400 error when passed an invalid data type', () => {
    return request(app)
    .get('/api/articles/notAnId/comments')
    .expect(400)
  })
})

describe('POST /api/articles/:article_id/comments', () => {
  test('Responds with the body posted by the client', () => {
    return request(app)
    .post('/api/articles/2/comments')
    .send({
      author: 'butter_bridge',
      article_id: 2,
      body: "sdoihod o h oe hgoie jo ej eij oiejrfoiej foejri"
    })
    .expect(201)
    .then((response) => {
      expect(response.body.comment).toMatchObject({
        body: "sdoihod o h oe hgoie jo ej eij oiejrfoiej foejri",
        votes: 0,
        author: 'butter_bridge',
        article_id: 2,
      })
    })
  })

  test('Responds with a 404 error when passed an invalid id', () => {
    return request(app)
    .post('/api/articles/99/comments')
    .send({
      author: 'butter_bridge',
      article_id: 2,
      body: "sdoihod o h oe hgoie jo ej eij oiejrfoiej foejri"
    })
    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe('Article not found');
    });
  })

  test('Responds with a 400 error when passed an invalid data type', () => {
    return request(app)
    .post('/api/articles/notAnId/comments')
    .send({
      author: 'butter_bridge',
      article_id: 2,
      body: "sdoihod o h oe hgoie jo ej eij oiejrfoiej foejri"
    })
    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe('Invalid input');
    });
  })
})

describe('PATCH /api/articles/:article_id', () => {
  test('responds with the field votes updated', () => {
    return request(app)
    .patch('/api/articles/3')
    .send({inc_votes: 15})

    .expect(200)
    .then((response) => {
      expect(response.body.article).toMatchObject({
        article_id: 3,
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: "2020-11-03T09:12:00.000Z",
        votes: 15,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
      })
    })
  })

  test('responds with a 404 error when passed an invalid id', () => {
    return request(app)
    .patch('/api/articles/99')
    .send({inc_votes: 15})

    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe('Article not found');
    });
  })

  test('responds with a 400 error when passed an invalid data type', () => {
    return request(app)
    .patch('/api/articles/notAnId')
    .send({inc_votes: 15})

    .expect(400)
    .then((response) => {
      expect(response.body.msg).toBe('Invalid input');
    });
  })
})

describe('DELETE /api/comments/:comment_id', () => {
  test('responds 204 status when deleted comment', () => {
    return request(app)
    .delete("/api/comments/3")
    .expect(204)
  })

  test('responds with a 404 error when passed an invalid id', () => {
    return request(app)
    .delete("/api/comments/99")

    .expect(404)
    .then((response) => {
      expect(response.body.msg).toBe('Comment not found');
    });
  })
})
