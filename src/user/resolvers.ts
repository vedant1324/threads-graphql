import { user } from ".";
import {getUserTokenPayload,userService, CreateUserPayload} from "../services/user"; 

const queries = {
 getUserToken:(_:any,payload:getUserTokenPayload)=>{
    const res = userService.getUserToken(payload);
    return res;
 }
}

const mutations = {
    createUser: async (_:any,payload:CreateUserPayload)=> {
     const res = await userService.createUser(payload);
     return  res.id;
    }
}

export const resolvers ={queries,mutations};