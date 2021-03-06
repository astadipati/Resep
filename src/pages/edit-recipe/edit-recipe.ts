import { RecipesService } from './../../services/recipes';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';


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
              private alrtCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipesService: RecipesService,
              private navCtrl: NavController) { }

  // membuat method OnInit
  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }
  // method onsubmit dari html diproses dimari pastikan yang diakses sudah dalam bentuk formGroup
  onSubmit() {
    // console.log(this.recipeForm);
    const value = this.recipeForm.value; 
    // ekstrack nilai recipeForm
    let ingredients = [];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => { //konvert array string ke array objek dibawah
        return {name: name, amount: 1}; //name by name property and amount set 1 by default
      });
    }
    this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    this.recipeForm.reset();//untk mengosongkan semua field
    this.navCtrl.popToRoot();
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
              const toast = this.toastCtrl.create({
            message: 'All Item were deleted !!',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          
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
          const toast = this.toastCtrl.create({
            message: 'Please enter a valid value',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          return;
        }
        // setelah view handling sudah sinkron sekarang datanya, karena dia tipe FormArray jadi penulisannya ada <formarray>
        // dan ketika ngepush FormControl maka baru bisa ekstrack data.name dan validaror
        (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
        const toast = this.toastCtrl.create({
            message: 'Item Added !',
            duration: 1500,
            position: 'bottom'
          });
          toast.present();
          
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
