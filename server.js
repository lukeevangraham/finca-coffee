const express = require("express");
const { engine } = require("express-handlebars"); // Updated for v8.x
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars Configuration
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    helpers: require("./helpers/handlebars-helpers"),
  }),
);
app.set("view engine", "handlebars");

// Routes
// Note: You can keep your ./routes/ folder structure or
// just point to a single mission-controller for this project.
app.use(require("./routes/"));

app.listen(PORT, () => {
  console.log(`Finca Coffee server running at http://localhost:${PORT}`);
});
