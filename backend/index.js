const express = require("express");
const app = express();
const port = 3000;

app.get("/post", (req, res) => {
  let posts = [
    {
      caption: "Goilden gate",
      location: "Pakistn",
    },
    {
      caption: "Dimond gate",
      location: "Pakistn",
    },
    {
      caption: "Pital gate",
      location: "Pakistn",
    },
  ];
  res.send(posts);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
