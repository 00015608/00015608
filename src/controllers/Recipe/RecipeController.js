import { Router } from "express";
import { body } from "express-validator";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  renderNewRecipe,
  renderEditForm,
} from "./RecipeCallHandler.js";
import "express-async-errors";

const validateRecipe = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("ingredients")
    .notEmpty()
    .withMessage("At least one ingredient is required"),
  body("instructions").notEmpty().withMessage("Instructions are required"),
];
const recipeController = Router();

recipeController.get("/", getAllRecipes);

recipeController.get("/new", renderNewRecipe);

recipeController.post("/new",  createRecipe);

recipeController.post("/delete/:id", deleteRecipe);

recipeController.get("/edit/:id", renderEditForm);

recipeController.post("/edit/:id", validateRecipe, updateRecipe);
recipeController.get("/:id", getRecipeById);
export default recipeController;
