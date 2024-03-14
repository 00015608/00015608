import { validationResult } from "express-validator";

import Recipe from "../../Models/RecipeModel.js";

// GET all recipes with user details
export async function getAllRecipes(req, res) {
  const recipes = await Recipe.find();
  res.render("Index", { title: "Recepies", recipes, user: req.user });
}
// GET a single recipe by ID with user details
export async function getRecipeById(req, res) {
  console.log(req.params);
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  res.render("RecipeDetails", { title: "Recipe Details", recipe });
}

export async function renderNewRecipe(req, res) {
  res.render("NewRecipe", { title: "New Recipe", user: req.user });
}
export async function createRecipe(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, description, ingredients, instructions } = req.body;
  const recipe = new Recipe({
    title,
    description,
    ingredients,
    instructions,
  });
  await recipe.save();
  res.redirect("/recipes");
}
export async function renderEditForm(req, res) {
  console.log(req.params);
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  res.render("EditRecipe", { title: "Edit Recipe ", recipe });
}
export async function updateRecipe(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!recipe) {
    throw new Error("Recipe not found");
  }
  res.redirect("/recipes");
}

// DELETE a recipe by ID
export async function deleteRecipe(req, res) {
  const recipe = await Recipe.findByIdAndDelete(req.params.id);
  if (!recipe) {
    throw new Error("Recipe not found");
  }
  res.redirect("/recipes");
}
