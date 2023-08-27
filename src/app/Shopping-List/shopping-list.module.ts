import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { ShoppingEditComponent } from "./Shopping-Edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports:[
        FormsModule,
        RouterModule.forChild([
            { path : '' , component : ShoppingListComponent },
    ]),
        SharedModule
    ]
})
export class ShoppingListModule{}