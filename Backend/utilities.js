const jsonwebtoken = require('jsonwebtoken');

//Middleware
function authenticateToken(req,res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!toekn) {return res.sendStatus(401);}

    JsonWebTokenError.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(401);
        req.user = user;
        next();
    })
}

module.exports = {
    authenticateToken,
}