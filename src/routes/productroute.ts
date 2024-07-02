import express,{Request,Response} from 'express';
import Product from '../models/product';
import toNewProductEntry from '../utilities/product.utils';
const productRout = express.Router();

// get all product
productRout.get('/',async(_req,res:Response):Promise<void>=>{
    try {
        const products = await Product.find();
        products.length <= 0 ? res.status(204).json({message:'Not conted'}) : res.status(200).json(products);
    } catch (error:string|any) {
        res.status(500).json({message:error.message})
    }
})

// create new product

productRout.post('/', async(req:Request,res:Response):Promise<void>=>{
    try {
        const newProduct = toNewProductEntry(req.body);
        if(!newProduct)return;

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error:any) {
        res.status(500).json({message:error.message})
        
    }
})

// find product by id

productRout.get('/:id', async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }
        const productFound = await Product.findById(id);
        !productFound? res.status(404).json({message:'Product not found'}):res.status(200).json(productFound);
    } catch (error) {
        res.status(500).json({message:error})
    }
})
// delete product by id
productRout.delete('/:id', async(req:Request,res:Response):Promise<void>=>{
    try {
        const{id}=req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({ message: 'Invalid product ID' });
            return;
        }
        const clientToDelete = await Product.findById(id);
        if(!clientToDelete) res.status(404).json({message:'Product not found'});
        await Product.deleteOne({_id : id}) 
        res.status(200).json(clientToDelete);
    } catch (error) {
        res.status(500).json({message:error});
    }
})

// modify product by id
productRout.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, category, status, price, quantity, isAvailable } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400).json({ message: 'Invalid product ID' });
        return;
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    category,
                    status,
                    price,
                    quantity,
                    isAvailable
                }
            },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        res.status(200).json(updatedProduct);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});


export default productRout;