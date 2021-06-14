const db = require("../db/connection");
const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index");
const {
  formatTopicData,
  formatUserData,
  formatArticleData,
  formatCommentData,
} = require("../db/utils/data-manipulation.js");
const { seed, articleResults } = require("../db/seeds/seed");
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
  describe("formatTopicData()", () => {
    test("should return an array of nested arrays from topic object", () => {
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
    });
    expect(formatTopicData(topicData)).toEqual([
      ["mitch", "The man, the Mitch, the legend"],
      ["cats", "Not dogs"],
      ["paper", "what books are made of"],
    ]);
  });
  describe("formatUserData()", () => {
    it("returns an array of nested arrays", () => {
      const userData = [
        {
          username: "butter_bridge",
          name: "jonny",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        },
        {
          username: "icellusedkars",
          name: "sam",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        },
        {
          username: "rogersop",
          name: "paul",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        },
        {
          username: "lurker",
          name: "do_nothing",
          avatar_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        },
      ];
      expect(Array.isArray(formatUserData(userData))).toBe(true);
      expect(Array.isArray(formatUserData(userData)[0])).toBe(true);
    });
  });
  describe("formatUserData()", () => {
    test("should return an array of nested arrays from user object", () => {
      const userData = [
        {
          username: "butter_bridge",
          name: "jonny",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        },
        {
          username: "icellusedkars",
          name: "sam",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        },
        {
          username: "rogersop",
          name: "paul",
          avatar_url:
            "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        },
        {
          username: "lurker",
          name: "do_nothing",
          avatar_url:
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        },
      ];
    });
    expect(formatUserData(userData)).toEqual([
      [
        "butter_bridge",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
        "jonny",
      ],
      [
        "icellusedkars",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
        "sam",
      ],
      [
        "rogersop",
        "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        "paul",
      ],
      [
        "lurker",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        "do_nothing",
      ],
    ]);
  });
  describe("formatArticleData()", () => {
    it("returns an array of nested arrays", () => {
      const articleData = [
        {
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: new Date(1594329060000),
          votes: 100,
        },
        {
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          created_at: new Date(1602828180000),
        },
        {
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: new Date(1604394720000),
        },
        {
          title: "Student SUES Mitch!",
          topic: "mitch",
          author: "rogersop",
          body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
          created_at: new Date(1588731240000),
        },
      ];
      expect(Array.isArray(formatArticleData(articleData))).toBe(true);
      expect(Array.isArray(formatArticleData(articleData)[0])).toBe(true);
    });
  });
  // describe("formatUserData()", () => {
  //   test("should return an array of nested arrays from user object", () => {
  //     const articleData = [
  //       {
  //         title: "Living in the shadow of a great man",
  //         topic: "mitch",
  //         author: "butter_bridge",
  //         body: "I find this existence challenging",
  //         created_at: new Date(1594329060000),
  //         votes: 100,
  //       },
  //       {
  //         title: "Sony Vaio; or, The Laptop",
  //         topic: "mitch",
  //         author: "icellusedkars",
  //         body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
  //         created_at: new Date(1602828180000),
  //       },
  //       {
  //         title: "Eight pug gifs that remind me of mitch",
  //         topic: "mitch",
  //         author: "icellusedkars",
  //         body: "some gifs",
  //         created_at: new Date(1604394720000),
  //       },
  //       {
  //         title: "Student SUES Mitch!",
  //         topic: "mitch",
  //         author: "rogersop",
  //         body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
  //         created_at: new Date(1588731240000),
  //       },
  //     ];
  //   });
  //   expect(formatUserData(userData)).toEqual(
  //     [
  //       [
  //         'Living in the shadow of a great man',
  //         'I find this existence challenging',
  //         100,
  //         'mitch',
  //         'butter_bridge',
  //         2020-07-09T21:11:00.000Z
  //       ],
  //       [
  //         'Sony Vaio; or, The Laptop',
  //         'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
  //         undefined,
  //         'mitch',
  //         'icellusedkars',
  //         2020-10-16T06:03:00.000Z
  //       ],
  //       [
  //         'Eight pug gifs that remind me of mitch',
  //         'some gifs',
  //         undefined,
  //         'mitch',
  //         'icellusedkars',
  //         2020-11-03T09:12:00.000Z
  //       ],
  //       [
  //         'Student SUES Mitch!',
  //         'We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages',
  //         undefined,
  //         'mitch',
  //         'rogersop',
  //         2020-05-06T02:14:00.000Z
  //       ]
  //     ]);
  // });

  describe("formatCommentData", () => {
    it("returns an array of nested arrays", () => {
      const commentData = [
        {
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          belongs_to: "They're not exactly dogs, are they?",
          created_by: "butter_bridge",
          votes: 16,
          created_at: new Date(1586179020000),
        },
        {
          body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
          belongs_to: "Living in the shadow of a great man",
          created_by: "butter_bridge",
          votes: 14,
          created_at: new Date(1604113380000),
        },
        {
          body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
          belongs_to: "Living in the shadow of a great man",
          created_by: "icellusedkars",
          votes: 100,
          created_at: new Date(1583025180000),
        },
        {
          body: " I carry a log — yes. Is it funny to you? It is not to me.",
          belongs_to: "Living in the shadow of a great man",
          created_by: "icellusedkars",
          votes: -100,
          created_at: new Date(1582459260000),
        },
        {
          body: "I hate streaming noses",
          belongs_to: "Living in the shadow of a great man",
          created_by: "icellusedkars",
          votes: 0,
          created_at: new Date(1604437200000),
        },
      ];
      expect(Array.isArray(formatCommentData(commentData))).toBe(true);
      expect(Array.isArray(formatCommentData(commentData)[0])).toBe(true);
      console.log(articleResults);
    });
  });
});
