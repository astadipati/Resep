import { Component } from '@angular/core';
// jangan lupa import NgForm nya
import { NgForm } from "@angular/forms";

import { ShoppingListService } from './../../services/shopping-list'; //ingat ini ada di app.module supaya bisa dipanggil servicenya

import { Ingredient } from './../../models/ingredient';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  // ini listItems dalam bentuk array dan mengimort model ingredient
  // pertanyaannya adalah bagaimana ngeload semua data itu? satu jalan yaitu ionviewWillEnter method
  listItems: Ingredient[];

  constructor(private slService: ShoppingListService) { }

  ionViewWillEnter() {
    // method ini untuk memastikan saja lalu kita buat satu method untuk tampil data loadItems()
    this.listItems = this.slService.getItems();
  }

  onAddItem(form: NgForm) {
    //  supaya tersedia
    this.slService.addItem(form.value.ingredientName, form.value.Amount);
    form.reset();
    //console.log(form);
    // supaya data tetep tidak hilang kita panggil lagi methodnya
    this.loadItems();
  }

  // method ini untuk menampilkan
  private loadItems(){
    this.listItems = this.slService.getItems();
  }

  // buat method hapus yang sudah di implement di shopping list
  onCheckItem(index : number){
    this.slService.removeItem(index);
    this.loadItems();
  }
}
