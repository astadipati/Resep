import { Ingredient } from './../models/ingredient';
export class ShoppingListService{
    private ingredients: Ingredient[] = [];

    addItem(name: string, amount:number){
        this.ingredients.push(new Ingredient(name, amount));
        console.log(this.ingredients);
    }
    // handle array masukan lebih 
    addItems(items: Ingredient[]){
        this.ingredients.push(...items);
    }
    // copy of array
    getItems(){
        return this.ingredients.slice();
    }
    // remove / delete
    removeItem(index: number){
        this.ingredients.splice(index, 1);
    }
}