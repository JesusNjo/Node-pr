import { Role,Gender,IClient} from "../models/client";
import Client from "../models/client";
//Validaciones

const isString = (value:string):boolean=>{
    return typeof value == 'string';
}

const isRole =(param:any):boolean=>{
    return Object.values(Role).includes(param);
}

const isGender= (param:any):boolean=>{
    return Object.values(Gender).includes(param);
}

//Parsear

const parseName = (nameFromRequest:any):string=>{
    if(!isString(nameFromRequest)){
        throw new Error('Incorrect or missing name')
    }
    return nameFromRequest;
}

const parsePassword = (passwordRequest:any):string=>{
    if(!isString(passwordRequest) ||passwordRequest.length<8){
        throw new Error('Incorrect or missing password. \nPassword should\'ve at least 8 characters. ')
    }
    return passwordRequest;
}
const parseUsername= (usernameRequest:any):string=>{
    if(!isString(usernameRequest)){
        throw new Error('Incorrect or missing username');
    }
    return usernameRequest;
}

const parseRole = (roleRequest:any):Role=>{
    if(!isString(roleRequest)||!isRole(roleRequest)){
        throw new Error('Incorrect or missing role');
    }

    return roleRequest;
}

const parseGender= (genderFromRequest:any):Gender=>{
    if(!isString(genderFromRequest) || !isGender(genderFromRequest)){
        throw new Error('Incorrect or missing gender');
    }
    return genderFromRequest;
}

const toNewClientEntry = (object:any):IClient=>{

    const newEntryClient = new Client({
        name: parseName(object.name),
        username: parseUsername(object.username),
        password: parsePassword(object.password),
        role: parseRole(object.role),
        gender: parseGender(object.gender)
    });

    return newEntryClient;
}
export default toNewClientEntry;