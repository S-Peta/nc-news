require("jest-sorted");
const request = require("supertest")
const app = require("../app/app")
const seed = require("../db/seeds/seed")
const db = require("../db/connection")

const endpoints = require("../endpoints.json")
const articleData = require("../db/data/test-data/articles")
const commentData = require("../db/data/test-data/comments")
const topicData = require("../db/data/test-data/topics")
const userData = require("../db/data/test-data/users")

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
  test('Responds with the articles data and status 200', () => {
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
})

describe('GET /api/articles/:article_id', () => {
  test('Return the data with the right article', () => {
    return request(app)
      .get('/api/articles/1')
      .expect(200)
      .then(({body}) => {
        const expectedBody =
          [{
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          }]

        expect(body.article).toEqual(expectedBody);
      })
  })

  test('Responds with an error when given article doesn exist', () => {
    return request(app)
    .get('/api/articles/99')
    .expect(404)
  })

  test('Responds with an error when given endpoint doesn exist', () => {
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

  test('Responds with an error when given article doesn exist', () => {
    return request(app)
    .get('/api/articles/99/comments')
    .expect(404)
  })

  test('Responds with an error when given endpoint doesn exist', () => {
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

  test('Responds with an error when given article doesn exist', () => {
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

  test('Responds with an error when given endpoint doesn exist', () => {
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
