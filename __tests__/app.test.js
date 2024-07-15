const request = require("supertest")
const app = require("../app/app")
const seed = require("../db/seeds/seed")
// const db = require("../db/data/test-data/index")
const articleData = require("../db/data/test-data/articles")
const commentData = require("../db/data/test-data/comments")
const topicData = require("../db/data/test-data/topics")
const userData = require("../db/data/test-data/users")

beforeEach(() => seed({articleData, commentData, topicData, userData}));



describe('/api/topics', () => {
  test('Return 200 to the client', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
  })
  test('Return the data to the client', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({body}) => {
        expect(body.topics.topicData).toEqual([
          { description: 'The man, the Mitch, the legend', slug: 'mitch' },
          { description: 'Not dogs', slug: 'cats' },
          { description: 'what books are made of', slug: 'paper' }
        ])
      })
  })
})
