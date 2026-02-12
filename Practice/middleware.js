export let mid1 = (req,res,next)=>{
    console.log(`${req.url} method ${req.method}`)
    console.log("this is mid 1")
    next()
}

export let validationPost= (req,res,next)=>{
    let {name,city} = req.body;

    //validation
    if(!name || !city){
        return res.status(400).json({
            message:"name and city field cannot be empty"
        })
    }
    next();
}