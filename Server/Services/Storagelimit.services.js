import {User} from "../Models/UserAccount.model.js"

export const storageused = async (id , model) =>{
        try {
            const data = await User.findOne({userId : id});
            if(!data){
                console.log("unauthorised access");
                const error = new Error("unauthorised access");
                error.status = 401;
                throw error;
            }
            const usage = await model.findOneAndUpdate({userId : data.AccountId},
                                                       {$setOnInsert : {storageUsed : 0 , media : [] }},  
                                                       {new : true , upsert : true ,     
                                                        projection: {
                                                            userId: 1,
                                                            storageUsed: 1
                                                            }
                                                        }); 
            const details = {
                userid : usage.userId,
                AccountId : data.AccountId,
                usage : usage.storageUsed,
                AccountType : data.accountType
            }
        return details;
        } catch (error) {
            throw error;
        }
}