const Koa = require("koa");
const static = require("koa-static");
const logger = require("koa-logger");
const cors = require("@koa/cors");
const app = new Koa();
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const config = require("config");
const bodyParser = require("koa-bodyparser");
const router = require("./routes/index.routes");
const sequelize = require("./config/db");
const PORT = config.get("port") || 3090;

// app.use(logger);
app.use(cors());
// app.use(bodyParser());
app.use(errorHandler);
app.use(router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Connection has been established successfully");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error)
  }
};

start();
