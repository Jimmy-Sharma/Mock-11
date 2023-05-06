const validate = (req, res, next) => {
    if (req.method === "POST") {
        if (req.body.title && req.body.author && req.body.category && req.body.price && req.body.quantity) {
            next()
        } else {
            res.send(
                {
                    "err": "Please fill all the details"
                })
        }
    }else{
        res.send(error)
    }
}

module.exports={
    validate
}