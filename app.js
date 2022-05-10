const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  siteRouter = require("./routers/siterouter"),
  scrapedRouter = require("./routers/scrapedrouter");
port = 2423;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/site", siteRouter);
app.use("/scraped", scrapedRouter);

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

mongoose
  .connect("mongodb://0.0.0.0:27017/project-node")
  .then(() => {
    app.listen(port, () => {
      console.info(`start server start listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
