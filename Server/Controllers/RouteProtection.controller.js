export const RouteProtection = (req , res)=>{
    const cookie = req.cookies.AiorNotToken;
    if(cookie){
        return res.status(200).json({
            isauth : true
        });
    }

    return res.status(200).json({
        isauth : false
    });
}