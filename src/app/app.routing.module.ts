import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router";

import { RecipesComponent } from "./Recipes/recipes.component";
import { ShoppingListComponent } from "./Shopping-List/shopping-list.component";
import { RecipeStartComponent } from "./Recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./Recipes/Recipe-Detail/recipe-detail.component";
import { RecipeEditComponent } from "./Recipes/recipe-edit/recipe-edit.component";
import { AuthComponent } from "./auth/auth.component";
import { RecipesResolverService } from "./Recipes/recipes-resolver.service";

const appRoutes : Routes = [
    { path : '' , redirectTo : '/recipes' , pathMatch : 'full'},
    { path : 'recipes' , component : RecipesComponent , children : [
        { path : '' , component : RecipeStartComponent},
        { path : 'new' , component : RecipeEditComponent ,  resolve: [RecipesResolverService]},
        { path : ':id' , component : RecipeDetailComponent , resolve: [RecipesResolverService]},
        { path : ':id/edit' , component : RecipeEditComponent}
    ]} , 
    { path : 'shopping-list' , component : ShoppingListComponent },
    { path : 'auth' , component : AuthComponent}

];

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})

export class AppRoutingModule {
}