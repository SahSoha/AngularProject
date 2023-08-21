import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import {  exhaustMap, map, take, tap } from "rxjs/operators";

import { RecipeService } from "../Recipes/recipe.service";
import { Recipe } from "../Recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn : "root" })
export class DataStorageService{
    constructor(
        private http: HttpClient , 
        private recipeService: RecipeService ,
        private authservice: AuthService ){}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put(
            'https://angular-50c38-default-rtdb.firebaseio.com/recipes.json' 
            , recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){
        return this.authservice.user.pipe(
            take(1) , 
            exhaustMap(user => {
            return this.http
            .get<Recipe[]>(
            'https://angular-50c38-default-rtdb.firebaseio.com/recipes.json',
            {
                params: new HttpParams().set('auth' , user.token)
            }
        );
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe , 
                    ingredients: recipe.ingredients ? recipe.ingredients: [] 
                };
            });
        }),
        tap( recipes => {
            this.recipeService.setRecipes(recipes);
        })
        
    );
        
  }
}