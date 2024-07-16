require("jest-sorted");
const request = require("supertest")
const app = require("../app/app")
const seed = require("../db/seeds/seed")
const db = require("../db/connection")
const moment = require('moment-timezone');

const endpoints = require("../endpoints.json")
const articleData = require("../db/data/test-data/articles")
const commentData = require("../db/data/test-data/comments")
const topicData = require("../db/data/test-data/topics")
const userData = require("../db/data/test-data/users")

beforeEach(() => seed({articleData, commentData, topicData, userData}));
afterAll(() => db.end());

describe('/api', () => {
  test('Return the content on the endpoints.json file', () => {
    return request(app)
      .get('/api')
      .expect(200)
      .then(({body}) => {
        expect(body.endpoints).toEqual(endpoints)
      })
  })
});

describe('/api/topics', () => {
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

describe('/api/articles', () => {
  test('Responds with the articles data and status 200', () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({body}) => {
        const {articles} = body;

        expect(articles).toHaveLength(13);
        expect(articles).toBeSortedBy("created_at", {descending: true});
        articles.forEach((article) => {
          expect(typeof article.title).toBe("string");
          expect(typeof article.votes).toBe("number");
        })
      })
  })
})

describe('/api/articles/:article_id', () => {
  test.skip('Return the data with the right article', () => {
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
            created_at: moment.tz(1594329060000, 'UTC').toISOString(),
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          }]

        expect(body.article).toEqual(expectedBody);
      })
  })
})

describe('/api/articles/:article_id/comments', () => {
  test('Return the data with the right article', () => {
    return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body}) => {
        const {comments} = body

        expect(comments).toHaveLength(11);
        expect(comments).toBeSortedBy("created_at", {descending: true});
        comments.forEach((comment) => {
          expect(typeof comment.author).toBe("string");
          expect(typeof comment.votes).toBe("number");
        })
      })
  })

  test('Responds with an error when given article doesn exist', () => {
    return request(app)
    .get('/api/articles/99/comments')
    .expect(404)
  })
})
