import * as dotenv from "dotenv";
import express from "express";
import Fs from "fs-extra";
import morgan from "morgan";
import cors from "cors";
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));

const webFiles = Fs.readdirSync(__dirname + "/routes");
webFiles.forEach(function (fname: string) {
  const fname_split: string[] = fname.split(".");
  if (fname_split[fname_split.length - 1] !== "ts") {
    return true;
  }
  const routeName: string = fname.replace(".ts", "");
  app.use(`/${routeName.toLowerCase()}`, require("./routes/" + routeName));
});

app.listen(PORT, () => {
  console.log(`Node Server Start Port: ${process.env.PORT}`);
});
