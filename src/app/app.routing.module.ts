import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router";

import { RecipesComponent } from "./Recipes/recipes.component";
import { ShoppingListComponent } from "./Shopping-List/shopping-list.component";
import { RecipeStartComponent } from "./Recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./Recipes/Recipe-Detail/recipe-detail.component";

const appRoutes : Routes = [
    { path : '' , redirectTo : '/recipes' , pathMatch : 'full'},
    { path : 'recipes' , component : RecipesComponent , children : [
        { path : '' , component : RecipeStartComponent},
        { path : ':id' , component : RecipeDetailComponent }
    ]} , 
    { path : 'shopping-list' , component : ShoppingListComponent }

];

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})

export class AppRoutingModule {
}