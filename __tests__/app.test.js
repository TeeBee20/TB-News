const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
require("jest-sorted");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET - /api/topics", () => {
  it("200: returns an object with key of topics and value of an array of topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(typeof body).toBe("object");
        expect(Array.isArray(body.topics)).toBe(true);
      });
  });
  it("200: returns array of topics in test data", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.topics).toHaveLength(3);
        expect(body).toEqual({
          topics: [
            {
              description: "The man, the Mitch, the legend",
              slug: "mitch",
            },
            {
              description: "Not dogs",
              slug: "cats",
            },
            {
              description: "what books are made of",
              slug: "paper",
            },
          ],
        });
      });
  });
  //correct test for 404 not found error, wrong file path//

  //   it.only('404: returns msg of "not found" for path that does not exist', () => {
  //     return request(app)
  //       .get("/api/not-a-path")
  //       .expect(404)
  //       .then((response) => {
  //         console.log(response.error);
  //         const { body } = response;
  //         expect(body.msg).toBe("not found");
  //       });
  //   });
});
describe("GET - /api/articles/:article_id", () => {
  test("200: returns an object with key of article with a value of the specified article object in an array", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(typeof body).toBe("object");
        expect(Array.isArray(body.article)).toBe(true);
        expect(typeof body.article[0]).toBe("object");
      });
  });
  test("200: returns specified article object", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.article[0]).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
  });
  test("400: returns error for invalid article id", () => {
    return request(app)
      .get("/api/articles/dog")
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("bad request");
      });
  });
  test("404: returns error for article id that does not exist", () => {
    return request(app)
      .get("/api/articles/9000")
      .expect(404)
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("not found");
      });
  });
});
//first test works only when patch is tested on its own//
describe("PATCH - /api/articles/:article_id", () => {
  test("200: returns updated article with incremented votes when given positive number", () => {
    return request(app)
      .patch("/api/articles/12")
      .expect(200)
      .send({ inc_votes: 10 })
      .then((response) => {
        const { body } = response;
        expect(body.article[0]).toEqual(
          expect.objectContaining({
            author: "butter_bridge",
            title: "Moustache",
            article_id: 12,
            body: "Have you seen the size of that thing?",
            topic: "mitch",
            created_at: "2020-10-11T11:24:00.000Z",
            votes: 10,
            comment_count: 0,
          })
        );
      });
  });
  test("200: returns updated article with decremented votes when given negative number", () => {
    return request(app)
      .patch("/api/articles/5")
      .expect(200)
      .send({ inc_votes: -10 })
      .then((response) => {
        const { body } = response;
        expect(body.article[0]).toEqual(
          expect.objectContaining({
            author: "rogersop",
            title: "UNCOVERED: catspiracy to bring down democracy",
            article_id: 5,
            body: "Bastet walks amongst us, and the cats are taking arms!",
            topic: "cats",
            created_at: "2020-08-03T13:14:00.000Z",
            votes: -10,
            comment_count: 2,
          })
        );
      });
  });
  test('400: returns "bad request" error when no inc_votes on request body', () => {
    return request(app)
      .patch("/api/articles/5")
      .expect(400)
      .send({ inc_votes: undefined })
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("bad request");
      });
  });
  test('400: returns "bad request" error when given invalid inc_votes value', () => {
    return request(app)
      .patch("/api/articles/5")
      .expect(400)
      .send({ inc_votes: "dog" })
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("bad request");
      });
  });
  test('400: returns "bad request" error when given request body with other properties', () => {
    return request(app)
      .patch("/api/articles/5")
      .expect(400)
      .send({ inc_votes: 10, name: "Mitch" })
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("bad request");
      });
  });
});
describe.only("GET - /api/articles", () => {
  it("200: returns an array of all article objects on an articles key sorted by date", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(Array.isArray(articles)).toBe(true);
        articles.forEach((article) => {
          expect(typeof article).toBe("object");
          expect(Array.isArray(article)).toBe(false);
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
        expect(articles.length).toBe(12);
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  it.only("200: returns an array of articles sorted by specified column name", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy("title", { descending: true });
      });
  });
});
