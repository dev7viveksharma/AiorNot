import { db } from "../database/sql.db.js";
import AppError from "../Utility/AppError.util.js";
export const handleuser = async(data , table) =>{
       try {
         console.log("enter handleuser");
         const sqlquery = `select * from ${table.tablename} where ${table.idname} = ? `;
         const [user] = await db.query(sqlquery , [data.id]);
             console.log("handleuser db" , user);
             if( user.length === 0 ){
                 throw new AppError("user not found",404);
             }
             const id = user[0][table.idname];
             console.log("handleuser id:" , id);
             return id;
       } catch (error) {
        console.log(error.message);
        throw error;
       }
}

export const handlecredits = async( data , table) => {
      try {
          console.log("enter handlecredits");
          console.log(data , table);
          const query = `select ${table.type} , ${table.idname} from ${table.tablename} where ${table.idname} = ?`;
          const [credits] = await db.query(query , [data.id]);
              console.log("db entered" , credits);
              if(credits.length === 0){
                  throw new AppError("user not found",404);
              }
  
              if(credits[0][table.type] === 0){
                  throw new Error("credit limit reached",400);
              }
              console.log("complete handlecredits" , credits[0][table.idname]);
              return credits[0];
      } catch (error) {
        console.log(error.message);
        throw error;
      }
}