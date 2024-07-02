import express,{NextFunction, Request,Response} from 'express';
import toNewClientEntry from '../utilities/client.utils';
import Client from '../models/client';
const clientRouter= express.Router();


//middleware

/*const getClient = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    let client;
    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) res.status(404).json({message:'Invalid id'});

    try {
        client = await Client.findById(id);
        client != null ? res.status(200).json(client):res.status(404).json({messsage:'Client not found'});
    } catch (error:any) {
        res.status(500).json({message:error.message})
    }

    next();

}*/

// get All clients

clientRouter.get('', async (_req, res: Response) => {
    try {
        const clients = await Client.find();
        clients.length === 0 ? res.status(204).json([]) : res.status(200).json(clients);
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
});

// create client

clientRouter.post('/', async(req:Request,res:Response):Promise<void>=>{
    try {
        const newClient = toNewClientEntry(req.body);
        await newClient.save();
        res.status(201).send(newClient);
    } catch (error:any) {
        res.status(400).send({ error: error.message });
    }
})

clientRouter.get('/:id', async(req:Request,res:Response):Promise<void>=>{
    try {
        const {id} = req.params;
        const client = await Client.findById(id);
        !client?res.status(404).json({message:'Not found'}) : res.status(200).json(client);

    } catch (error) {
        
    }
})

clientRouter.delete('/:id', async(req:Request,res:Response):Promise<void>=>{
    try {
        const {id} = req.params;
        const clientToDelete = await Client.findById(id);

        if(!clientToDelete){
            res.status(404).json({message:'Client not found'});
            return;
        }else{
            res.status(200).json(clientToDelete);
            await Client.deleteOne({
                _id: id
            });
        }


    } catch (error) {
        
    }
})

clientRouter.put('/:id', async(req:Request,res:Response):Promise<void>=>{
    const {id} = req.params;
    const {name,
        username,
        password,
        role,
        gender} = req.body;
    if(!name || !username ||!password || !role || !gender){
        res.status(400).json({message:'All field are required'});
    }
    try {
        let clientFound = await Client.findById(id);
        if(!clientFound) return;

        clientFound.name = name || clientFound.name;
        clientFound.username = username || clientFound.username;
        clientFound.password = password ||clientFound.password;
        clientFound.role = role ||clientFound.role;
        clientFound.gender = gender ||clientFound.gender;
        await clientFound.save();

        res.status(200).json(clientFound);

    } catch (error) {
        res.status(500).json({message: error});
    }
})

export default clientRouter;