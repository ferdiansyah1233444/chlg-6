require("dotenv").config();

const { validatePostUser } = require("./middleware/middleware"); 
const express = require("express");
const app = express();
const route = require("./route/routes");


const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", route);
app.use("/images", express.static("media/images"));


app.use("/", route);

app.listen(port, () => {
  console.log(`website berita berjalan di port ${port}`);
});