const db = require("../db/connection");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index");
const { formatTopicData } = require("../db/utils/data-manipulation.js");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const express = require("express");

// beforeEach(() =>
//   seed({
//     articleData,
//     commentData,
//     topicData,
//     userData,
//   })
// );
// afterAll(() => db.end());

describe("formatTopicData()", () => {
  it("returns an array of nested arrays", () => {
    const topicData = [
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
    ];
    expect(Array.isArray(formatTopicData(topicData))).toBe(true);
    expect(Array.isArray(formatTopicData(topicData)[0])).toBe(true);
  });
});
