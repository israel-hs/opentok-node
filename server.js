const express = require("express");

const app = express();

let members = [];

// this shouldn't be a get
app.get("/add-member/:member", (req, res) => {
  const member = req.params.member;
  if (member && !members.includes(member)) {
    members.push(member);
  }
  res.status(200).json({ members });
});

app.get("/get-members", (req, res) => {
  res.json({ members });
});

app.get("/remove-member/:member", (req, res) => {
  const member = req.params.member;
  if (member) {
    members = members.filter((name) => name !== member);
  }
  res.status(200).json({ members });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
