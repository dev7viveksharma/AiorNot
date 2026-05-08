export const productinfo = (req , res , next) =>{
    if(req.usertype === "user"){        
        req.tabledetails = {
            tablename : "usercredits",
            type :   req.body? req.body.type : req.query.type,
            idname : "user_id"
        }
        return next();
    }

    req.tabledetails = {
            tablename : "guests",
            type : req.body? req.body.type : req.query.type,
            idname : "guest_id"
    }
    next();
}