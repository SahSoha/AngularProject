import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../Recipes/recipe.service";

@Injectable({ providedIn : "root" })
export class DataStorageService{
    constructor(private http: HttpClient , private recipeService: RecipeService ){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put(
            'https://angular-50c38-default-rtdb.firebaseio.com/recipes.json' 
            , recipes)
        .subscribe(response => {
            console.log(response);
        });
    }
}