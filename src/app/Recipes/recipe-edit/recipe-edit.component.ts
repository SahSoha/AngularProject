import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup , Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params && params['id'] ? true : false;
          this.initForm();
        }
      );
  }

  onSubmit() {
    /*const newRecipe = new Recipe
    (this.recipeForm.value['name'] ,
    this.recipeForm.value['description'],
    this.recipeForm.value['imagePath'],
    this.recipeForm.value['ingredients']);*/
    if(this.editMode){
      this.recipeService.updateRecipe(this.id , this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl(null , Validators.required),
        'amount' : new FormControl(null , [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/)
        ])
      })
    )
  }

  onDeleteIngredient(index:number){
    (<FormArray> this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);




    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;


      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName , Validators.required),
        'imagePath': new FormControl(recipeImagePath , Validators.required),
        'description': new FormControl(recipeDescription , Validators.required),
        'ingredients': new FormArray([])
      })

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          this.recipeForm.controls['ingredients'].push(
            new FormGroup({
              'name': new FormControl(ingredient.name , Validators.required),
              'amount': new FormControl(ingredient.amount , [
                Validators.required,
                 Validators.pattern(/^\d+(\.\d{1,2})?$/)
               ]) , 
              'ingredients': recipeIngredients
            })
          );
        }
        this.recipeForm.controls['ingredients'].updateValueAndValidity({ emitEvent: false });
      }
    } else {
      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName),
        'imagePath': new FormControl(recipeImagePath),
        'description': new FormControl(recipeDescription),
        'ingredients': new FormArray([])
      })
    }
  }

  //get ingredientControls() { 
  //return (this.recipeForm.get('ingredients') as FormArray).controls;
  //}
  //Fe L .html : *ngFor = "let ingredientCtrl of ingredientControls; let i = index" 
}
