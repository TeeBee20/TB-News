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
  createArticleId,
} = require("../db/utils/data-manipulation.js");
const { seed, articleResults } = require("../db/seeds/seed");
const request = require("supertest");
const express = require("express");

describe.only("formatTopicData()", () => {
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
  it("returns empty array when given empty array", () => {
    const topicData = [];
    expect(formatTopicData(topicData)).toEqual([]);
  });
  it("should return an array of nested arrays from topic object", () => {
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
    expect(formatTopicData(topicData)).toEqual([
      ["mitch", "The man, the Mitch, the legend"],
      ["cats", "Not dogs"],
      ["paper", "what books are made of"],
    ]);
  });
  it("does not mutate topic data", () => {
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
    formatTopicData(topicData);
    expect(topicData).toEqual([
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
    ]);
  });
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
  it("return empty array when given empty array", () => {
    const userData = [];
    expect(formatUserData(userData)).toEqual([]);
  });
  it("should return an array of nested arrays from user object", () => {
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
  test("should return an array of nested arrays from article object", () => {
    const articleData = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date(1594329060000),
        votes: 100,
      },
    ];
    expect(formatArticleData(articleData)).toEqual([
      [
        "Living in the shadow of a great man",
        "I find this existence challenging",
        100,
        "mitch",
        "butter_bridge",
        new Date(1594329060000),
      ],
    ]);
  });
});

describe("formatCommentData", () => {
  it("returns an array of nested arrays", () => {
    const commentData = [
      {
        title: "The vegan carnivore?",
        topic: "cooking",
        author: "tickle122",
        body: "The chef Richard McGeown has faced bigger culinary challenges in his distinguished career than frying a meat patty in a little sunflower oil and butter. But this time the eyes and cameras of hundreds of journalists in the room were fixed on the 5oz (140g) pink disc sizzling in his pan, one that had been five years and €250,000 in the making. This was the world’s first proper portion of cultured meat, a beef burger created by Mark Post, professor of physiology, and his team at Maastricht University in the Netherlands. Post (which rhymes with ‘lost’, not ‘ghost’) has been working on in vitro meat (IVM) since 2009. On 5 August this year he presented his cultured beef burger to the world as a ‘proof of concept’. Having shown that the technology works, Post believes that in a decade or so we could see commercial production of meat that has been grown in a lab rather than reared and slaughtered. The comforting illusion that supermarket trays of plastic-wrapped steaks are not pieces of dead animal might become a discomforting reality.",
        created_at: new Date(1583788860000),
      },
    ];
    const articleObj = {
      "The vegan carnivore?": 36,
    };
    expect(Array.isArray(formatCommentData(commentData, articleObj))).toBe(
      true
    );
    expect(Array.isArray(formatCommentData(commentData, articleObj)[0])).toBe(
      true
    );
  });
  test("should return an array of nested arrays from comment object", () => {
    const commentData = [
      {
        body: "Test",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        created_by: "tickle122",
        votes: -1,
        created_at: new Date(1590103140000),
      },
    ];
    const articleObj = {
      "The People Tracking Every Touch, Pass And Tackle in the World Cup": 36,
    };
    expect(formatCommentData(commentData, articleObj)).toEqual([
      ["tickle122", 36, -1, new Date(1590103140000), "Test"],
    ]);
  });
  describe("createArticleId()", () => {
    test("returns empty object when given empty array", () => {
      const articleResult = [];
      expect(createArticleId(articleResult)).toEqual({});
    });
    test("Should return article in correct form", () => {
      const articleResult = [
        {
          article_id: 67,
          title: "Hi",
          body: "Test",
          votes: 2,
          topic: "Hello",
          author: "Rowling",
          created_at: new Date(1590103140000),
        },
      ];
      expect(createArticleId(articleResult)).toEqual({
        Hi: 67,
      });
    });
  });
});
// Start by making sure article is correct form, key of rows that is an array. Start with empty array. Receives empty obj back.
// Start populating array with objects. All objects need title and article id. Check returned object has keys of titles and values of the id's.
