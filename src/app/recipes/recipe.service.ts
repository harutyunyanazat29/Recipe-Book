import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>()

	// private recipes: Recipe[] = [
	// 	new Recipe(
	// 		'Tasty Schnitzel',
	// 		'A super-tasty Schnitzel - just awesome!',
	// 		'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Schnitzel.JPG/800px-Schnitzel.JPG?20101115001902',
	// 		[
	// 			new Ingredient('Meat', 1),
	// 			new Ingredient('French Fries', 20)
	// 		]),
	// 	new Recipe(
	// 		'Big Burger',
	// 		'What else you need to say?',
	// 		'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg/800px-Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
	// 		[
	// 			new Ingredient('Buns', 2),
	// 			new Ingredient('Meat', 1)
	// 		])
	// ];

	private recipes: Recipe[] = []

	constructor(private shoppingListService: ShoppingListService) { }

	setRecipes(recipes: Recipe[]) {
		this.recipes = recipes
		this.recipesChanged.next(this.getRecipes())
	} 

	getRecipes() {
		return this.recipes.slice();
	}

	getRecipe(index: number) {
		return this.recipes[index]
	}

	addIngredientsToShoppingList(ingredients: Ingredient[]) {
		this.shoppingListService.addIngredients(ingredients)
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe)
		this.recipesChanged.next(this.getRecipes())
	}

	updateRecipe(index: number, newRecipe: Recipe) {
		this.recipes[index] = newRecipe
		this.recipesChanged.next(this.getRecipes())
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1)
		this.recipesChanged.next(this.getRecipes())
	}

}