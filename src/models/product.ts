import mongoose,{Schema,Document, Model} from "mongoose";

export enum Category{
    LADY= 'lady',
    GENTLEMAN= 'gentleman',
    ACCESORY= 'accesory',
    CLOTHES= 'clothes'
}

export enum Status {
    NEW = 'New',
    USED = 'Used',
    REFURBISHED = 'Refurbished',
    DEFECTIVE = 'Defective',
    DISCONTINUED = 'Discontinued',
}

export interface IProduct extends Document{
    name:string,
    category: Category,
    status: Status,
    price: number,
    quantity: number
    isAvailable?:boolean
}

const productSchema = new Schema<IProduct>({
    name: {type:String,required:true},
    category: {type:String,enum :Object.values(Category),required:true},
    status: {type:String,enum:Object.values(Status), required:true},
    price: {type:Number,required:true},
    quantity: {type:Number,required:true},
    isAvailable: {type:Boolean}
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product',productSchema);
export default Product;