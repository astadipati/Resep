import { Component } from '@angular/core';
// jangan lupa import NgForm nya
import { NgForm } from "@angular/forms";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  onAddItem(form: NgForm){
    console.log(form);
  }
}
