import {v4 as uuidv4} from "uuid";
export const createuser = async(id) =>{

    const user = await model.create({
                            id : uuidv4,
                            userId: id ,
                            });
    return user;
}