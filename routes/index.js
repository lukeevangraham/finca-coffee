let router = require("express").Router();
const axios = require("axios");

// let orgRoutes = require("./org");
// let eventsRoutes = require("./events");

// router.use("/org", orgRoutes);
// router.use("/events", eventsRoutes);

router.get("/", async (req, res) => {
  const response = await Promise.all([
    axios.get(`${process.env.API_URL}vth-home`),
  ]);

  console.log("RES: ", response[0].data);
  res.render("index", { clubs: response[0].data.data });
});

// router.get("/about", (req, res) => {
//   res.render("about");
// });

module.exports = router;
