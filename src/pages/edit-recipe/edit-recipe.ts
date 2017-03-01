import { NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode= 'New';
  selectOptions = ['easy','medium','hard'];
  constructor (private navParams: NavParams){}

  // membuat method OnInit
  ngOnInit(){
    this.mode = this.navParams.get('mode');
  }
}
