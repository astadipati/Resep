
import { Component } from '@angular/core';
// jangan lupa import NgForm nya
import { NgForm } from "@angular/forms";

import { ShoppingListService } from './../../services/shopping-list'; //inat ini ada di app.module supaya bisa dipanggil servicenya

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
    constructor (private slService: ShoppingListService){}
     onAddItem(form: NgForm){
      //  supaya tersedia
      this.slService.addItem(form.value.ingredientName, form.value.Amount);
      form.reset();
    //console.log(form);
  }
}
