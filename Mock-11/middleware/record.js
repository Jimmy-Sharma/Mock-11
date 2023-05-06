const record = (req, res, next) => {
    let ID = req.params.id;
    if (req.method == "PATCH") {
        next()
    }

    if (req.method == "DELETE") {
        next()
    }
}


module.exports = {
    record
}