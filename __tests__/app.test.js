const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const { seed } = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const { string } = require("pg-format");

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
            created_at: expect.anything(),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          })
        );
      });
  });
});
