const express = require("express");

const app = express();

const users = [
  { id: 1, name: "users 1" },
  { id: 2, name: "users 2" },
  { id: 3, name: "users 3" },
  { id: 4, name: "users 4" },
  { id: 5, name: "users 5" },
  { id: 6, name: "users 6" },
  { id: 7, name: "users 7" },
  { id: 8, name: "users 8" },
  { id: 9, name: "users 9" },
  { id: 10, name: "users 10" },
  { id: 11, name: "users 11" },
];

const posts = [
  { id: 1, name: "posts 1" },
  { id: 2, name: "posts 2" },
  { id: 3, name: "posts 3" },
  { id: 4, name: "posts 4" },
  { id: 5, name: "posts 5" },
  { id: 6, name: "posts 6" },
  { id: 7, name: "posts 7" },
  { id: 8, name: "posts 8" },
  { id: 9, name: "posts 9" },
  { id: 10, name: "posts 10" },
  { id: 11, name: "posts 11" },
];

const paginatedResult = (model) => {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = model.slice(startIndex, endIndex);
    res.json(results);

    res.paginatedResult = results;
  };
};

app.get("/posts", paginatedResult(posts), (req, res) => {
  res.json(res.paginatedResult);
});

app.get("/users", paginatedResult(users), (req, res) => {
  res.json(res.paginatedResult);
});

app.listen(6060, () => {
  console.log("<----server connected successfully :: 6060---->");
});
