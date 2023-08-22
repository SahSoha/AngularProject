import { NgModule } from "@angular/core";
import { Routes , RouterModule} from "@angular/router";


const appRoutes : Routes = [
    { path : '' , redirectTo : '/recipes' , pathMatch : 'full'}, 
    { path : 'recipes' ,
     loadChildren:() => import('./Recipes/recipes.module').then(m => m.RecipesModule)
    },
    //Bdl ma akteb el sentence bta3t loadchildren in this way mmkn a write it in this way:
    //loadChildren: () => import('./recipes/recipes.module)
    // .then(m => m.RecipesModule) so this is a more modern syntax for loading routes lazily
  /*  { 
        path : 'shopping-list' , 
        loadChildren: () =>
        import('./Shopping-list/shopping-list.module').then(
          m => m.ShoppingListModule)
      }, */
    { 
        path : 'auth' , 
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
    }
];

@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})

export class AppRoutingModule {
}