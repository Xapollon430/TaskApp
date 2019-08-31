const express = require("express");
const app = express();
const Router = require("./routes/routes");

app.use(express.static("public"));
app.set("views", "ejs");
app.use(express.json());
app.use(Router);

app.listen(3000, console.log("3000 Starting"));
