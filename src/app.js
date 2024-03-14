import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import recipeController from "./controllers/Recipe/RecipeController.js";
import * as path from "path";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
const app = express();

app.set("views", path.join(process.cwd(), "src", "views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "src", "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

app.use("/", recipeController);
app.use(errorHandler);

export default app;
