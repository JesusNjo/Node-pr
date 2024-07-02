import Product, {Category,IProduct,Status} from "../models/product";


// Validaciones

const isString= (value:any):boolean=>{
    return typeof value == 'string';
}
const isNumber= (value:any):boolean=>{
    return typeof value == 'number';
}
const isCategory=(value:any):boolean=>{
    return Object.values(Category).includes(value);
}
const isStatus=(value:any):boolean=>{
    return Object.values(Status).includes(value);
}
const isBoolean=(value:any):boolean=>{
    return typeof value == 'boolean';
}

//parsear

const parseName=(nameFromRequest:any):string=>{
    if(!isString(nameFromRequest)){
        throw new Error('Incorrect or missing name');
    }
    return nameFromRequest;
}
const parsePrice=(priceFromRequest:any):number=>{
    if(!isNumber(priceFromRequest)){
        throw new Error('Incorrect or missing price');
    }
    return priceFromRequest;
}
const parseQuantity=(quantityFromRequest:any):number=>{
    if(!isNumber(quantityFromRequest)){
        throw new Error('Incorrect or missing quantity');
    }
    return quantityFromRequest;
}
const parseIsAvailable=(isAFromQuest:any):boolean=>{
    if(!isBoolean(isAFromQuest)){
        throw new Error('Incorrect or missing available');
    }
    return isAFromQuest;
}
const parseCategory=(categoryFromRequest:any):Category=>{

    return !isCategory(categoryFromRequest) ? 
    new Error('Incorrect or missing category') : categoryFromRequest;
}
const parseStatus=(statusFromRequest:any):Status=>{
    return !isStatus(statusFromRequest)?
    new Error('Incorrect or missing status'): statusFromRequest;
}

const toNewProductEntry = (object:any):IProduct=>{
    const newProduct = new Product({
        name: parseName(object.name),
        price: parsePrice(object.price),
        quantity: parseQuantity(object.quantity),
        isAvailable: parseIsAvailable(object.isAvailable),
        category: parseCategory(object.category),
        status: parseStatus(object.status)
    })
    return newProduct;
}

export default toNewProductEntry;