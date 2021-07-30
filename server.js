const express = require("express");
const cors = require("cors");
require("module-alias/register");
const app = express();
const PORT = 5000 || process.env.PORT;
const dbHelper = require("@database/database_helper");
const routerApi = require("@routes/index.routes");
dbHelper.connectMongoDB();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use("/api", routerApi);

// error api routes not exist
app.get("/*", (_, res) => {
  res.status(404).json({
      message: "Not Found",
      description: "Page not found",
  });
});

app.listen(PORT, (err) => {
  if (err) return console.log("Fail to load Server");
  console.log(`Server is running on port:${PORT}`);
});
