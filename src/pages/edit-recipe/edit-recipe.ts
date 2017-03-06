import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController } from 'ionic-angular';


@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private actionSheetController: ActionSheetController,
              private alrtCtrl: AlertController) { }

  // membuat method OnInit
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }
  // method onsubmit dari html diproses dimari pastikan yang diakses sudah dalam bentuk formGroup
  onSubmit() {
    console.log(this.recipeForm);
  }
  // ini akan hendle action sheets show dari bawah yang harus didaftarkan di consturctor
  // supaya dapat di inport
  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What you want to do ?',
      // ingat buttons ada S nya kalau gak ada jadi error
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove All Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if (len > 0){
              for(let i = len -1; i >= 0; i--){
                fArray.removeAt(i);
              }
            }
          }
        },
        {
          text: 'cancel',
          role: 'cancel'
        }]
    });
    // supaya ketika di klik tampil maka
    actionSheet.present();
  }

private createNewIngredientAlert(){
  // const newIngredientAlert = this.alrtCtrl.create({
  return this.alrtCtrl.create({
    title: 'Add Ingredient',
    inputs:[{
      name: 'name',
      placeholder: 'Name'
    }],
    buttons:[{
    text: 'Cancel',
    role: 'cancel'
  },
    {
      text: 'Add',
      handler: data => {
        // jika data kosong atau null
        if(data.name.trim() == '' || data.name == null){
          return;
        }
        // setelah view handling sudah sinkron sekarang datanya, karena dia tipe FormArray jadi penulisannya ada <formarray>
        // dan ketika ngepush FormControl maka baru bisa ekstrack data.name dan validaror
        (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
      }
    }
  ]
  });
}
  // ini untuk membuat halaman dinamis, kita inisialisasi dulu methodnya
  private initializeForm() {
    // recipeForm sesuai dengan yang ada pada HTML, istilahe sinkronisasi sama html form
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),
      // kita perlu formArray 
      'ingredients': new FormArray([])
    });
  }
}
