import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {

constructor (private navCtrl: NavController){}

// baru buat methodnya
  onNewRecipe(){
    // 2 stack dengan membawa objevt
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
}
