const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
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
describe("GET - /api/articles", () => {
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
  it("200: returns an array of articles sorted by specified column name", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy("title", { descending: true });
      });
  });
  it("200: returns an array of articles sorted by specified column name", () => {
    return request(app)
      .get("/api/articles?sort_by=topic")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy("topic", { descending: true });
      });
  });
  it("200: returns an array of articles sorted by specified order given when no sort_by is given", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy("created_at", { descending: false });
      });
  });
  it("200: returns an array of articles sorted by specified column name and order", () => {
    return request(app)
      .get("/api/articles?sort_by=topic&order=asc")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(articles).toBeSortedBy("topic", { descending: false });
      });
  });
  it("200: returns an array of articles filtered by given topic, with default sorted by and order", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
  it("200: returns an empty array when given valid topic that has no articles", () => {
    return request(app)
      .get("/api/articles?topic=paper")
      .expect(200)
      .then((response) => {
        const { articles } = response.body;
        expect(Array.isArray(articles)).toBe(true);
        expect(articles.length).toBe(0);
      });
  });
  it("400: returns error when given invalid sort_by query", () => {
    return request(app)
      .get("/api/articles?sort_by=teddy")
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("bad request");
      });
  });
  it("400: returns error when given invalid order query", () => {
    return request(app)
      .get("/api/articles?order=left")
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("bad request");
      });
  });
  it("404: returns error when given non-existent topic query", () => {
    return request(app)
      .get("/api/articles?topic=apple")
      .expect(404)
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("not found");
      });
  });
});
describe("GET - /api/articles/:article_id/comments", () => {
  it("200: returns an array of all comment objects on a key of 'comments' when given an article_id", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(typeof body).toBe("object");
        expect(Array.isArray(body.comments)).toBe(true);
        expect(typeof body.comments[0]).toBe("object");
        expect(body.comments.length).toBe(2);
      });
  });
  it("200: returns array of comment objects in test data from specified article", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then((response) => {
        const { body } = response;
        expect(body.comments).toEqual([
          {
            comment_id: 1,
            author: "butter_bridge",
            article_id: 9,
            votes: 16,
            created_at: expect.any(String),
            body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          },
          {
            comment_id: 17,
            author: "icellusedkars",
            article_id: 9,
            votes: 20,
            created_at: expect.any(String),
            body: "The owls are not what they seem.",
          },
        ]);
      });
  });
  it("404: returns error when given article_id that does not exist", () => {
    return request(app)
      .get("/api/articles/9000/comments")
      .expect(404)
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("not found");
      });
  });
  it("400: returns error when given invalid path", () => {
    return request(app)
      .get("/api/articles/nine/comments")
      .expect(400)
      .then((response) => {
        const { body } = response;
        expect(body.msg).toBe("bad request");
      });
  });
});
describe.only("POST - /api/articles/:article_id/comments", () => {
  test("200: returns object of posted comment", () => {
    return request(app)
      .post("/api/articles/9/comments")
      .expect(200)
      .send({ username: "butter_bridge", body: "this is comment" })
      .then((response) => {
        const { body } = response;
        expect(body.comment[0]).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            author: "butter_bridge",
            article_id: 9,
            votes: 0,
            created_at: expect.any(String),
            body: "this is comment",
          })
        );
      });
  });
  // test("200: adds posted comment to comments", () => {
  //   return request(app)
  //     .post("/api/articles/9/comments")
  //     .expect(200)
  //     .send({ username: "butter_bridge", body: "this is comment" })
  //     .then((response) => {
  //       const { body } = response;
  //       expect(body.comments.length).toBe(3);
  //       expect(body.comments).toEqual([
  //         {
  //           comment_id: 1,
  //           author: "butter_bridge",
  //           article_id: 9,
  //           votes: 16,
  //           created_at: expect.any(String),
  //           body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
  //         },
  //         {
  //           comment_id: 17,
  //           author: "icellusedkars",
  //           article_id: 9,
  //           votes: 20,
  //           created_at: expect.any(String),
  //           body: "The owls are not what they seem.",
  //         },
  //         {
  //           comment_id: 19,
  //           author: "butter_bridge",
  //           article_id: 9,
  //           votes: 0,
  //           created_at: expect.any(String),
  //           body: "this is comment",
  //         },
  //       ]);
  //     });
  // });
});
//finish working on topic query//
