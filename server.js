const express = require("express");
const cors = require("cors");

const app = express();

// middleware to have our server accept json (for post and delete ops)
// and cors to accept cross origin requests from any other site
app.use(express.json());
app.use(cors());

let members = [];

app.post("/add-member", (req, res) => {
  const member = req.body.member;
  if (member && !members.includes(member)) {
    members.push(member);
  }
  res.status(200).json({ members });
});

app.get("/get-members", (req, res) => {
  res.json({ members });
});

app.delete("/remove-member", (req, res) => {
  const member = req.body.member;
  if (member) {
    members = members.filter((name) => name !== member);
  }
  res.status(200).json({ members });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
