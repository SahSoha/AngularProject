import { ShoppingListService } from "../Shopping-List/shopping-list.service";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";
import { EventEmitter , Injectable } from "@angular/core";

@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
        'Schnitzel' 
        , 'A super tasty Schnitzel !' , 
        'https://jamiegeller.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_760/MTc0OTYxMjM3ODU4MTk5MjEw/chicken-shawarma-skillet-with-fresh-tomato-salad---1.webp'
        , [
            new Ingredient('Chicken' , 1),
            new Ingredient('French Fries' , 20)
        ]),
        new Recipe(
        'Beef Burger' 
        , 'Big Delicious Burger !' , 
        'https://www.recipetineats.com/wp-content/uploads/2022/08/Stack-of-cheeseburgers.jpg?resize=650,813'
        , [
            new Ingredient('Buns' , 2),
            new Ingredient('Beef Patties' , 2),
            new Ingredient('Layers of Cheddar Cheese' , 4),
            new Ingredient('Tomatos' , 2),
            new Ingredient('Pickles' , 3),
            new Ingredient('Buffalo Sauce' , 5),
        ])
      ];

    constructor( private slService : ShoppingListService){}  

    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients : Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
}