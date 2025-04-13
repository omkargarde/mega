import { UserModel } from "../../models/user.model.ts";

const UserDoesExist =  (email:string)=>{
    return UserModel.findOne({
        email: { $eq: email },
      });
     
}

export {UserDoesExist}