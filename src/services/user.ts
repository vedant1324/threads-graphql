import { prismaClient } from "../lib/db"
import {createHmac,randomBytes} from "node:crypto"
import JWT from 'jsonwebtoken';


const JWT_SECRET="KSJDF232$@!";


export interface CreateUserPayload{
    firstName:string ,
    lastName?:string ,
    email:string ,
    password:string ,
}

export interface getUserTokenPayload{
    email:string ,
    password:string ,
}

export class userService{
    public static gethash(salt:string,password:string){
        const hashedPassWord = createHmac('sha256',salt).update(password).digest('hex');
        return hashedPassWord;
    }

    public static createUser(payload:CreateUserPayload){
       
        // can add your validation for extra checks if wanted using zod
        // for check of email and ensuring passsword is strong or not

        const {firstName,lastName,email,password}= payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassWord = userService.gethash(salt,password);
        return prismaClient.user.create({
            data:{
                firstName,
                email,
                lastName,
                password:hashedPassWord,
                salt,
            }
        })
    }
    public static async getUserByEmail(email:string) {
        return await prismaClient.user.findUnique({where :{ email:email }})
        
    }


    public static async getUserToken(payload:getUserTokenPayload){
        const {email,password}= payload;
        const person = await userService.getUserByEmail(email);
        if(!person) throw new Error ("user doesn't exist");

       const hashedPassWord = userService.gethash(person.salt , password)
       if(hashedPassWord!==person.password) throw new Error ("Incorrect password");
       
       const token = JWT.sign({id:person.id,email:person.email},JWT_SECRET);
       return token;
    }
}


