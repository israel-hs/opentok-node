const express = require("express");

const app = express();

let members = [];

// this shouldn't be a get
app.get("/addMember/:member", (req, res) => {
  const member = req.params.member;
  console.log("member", member);
  if (member && !members.includes(member)) {
    members.push(member);
  }
  res.sendStatus(200).json({ members });
});

app.get("/getMembers", (req, res) => {
  res.json({ members });
});

app.get("removeMember/:member", (req, res) => {
  const member = req.params.member;
  if (member) {
    members = members.filter((name) => name !== member);
  }
  res.sendStatus(200).json({ members });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
