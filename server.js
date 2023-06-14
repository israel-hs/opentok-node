const express = require("express");
const cors = require("cors");
const { sessionId, token } = require("./opentok.config");

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

app.get("/call-v2/room/:roomId", (req, res) => {
  const roomId = req.params.roomId;

  if (roomId && roomId !== "0") {
    const response = {
      roomId,
      status: "Open",
      recording: "AudioVideo",
      openTokSessionId: sessionId,
      openTokAccessToken: token,
      activeParticipants: [
        {
          userType: "expert",
          userId: "some-random-uuid-for-expert",
        },
        {
          userType: "member",
          userId: "some-random-uuid-for-member",
        },
      ],
    };
    res.json({ ...response });
  }

  res.status(404).json({ error: "No room id provided or the room is closed" });
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
