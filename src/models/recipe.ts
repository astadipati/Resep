import { Ingredient } from './ingredient';
// recipe bukan plurar jadi tanpa s
export class Recipe{
    constructor(public title: string, 
                public description: string, 
                public difficulty: string, 
                public ingredients: Ingredient[]){}
}