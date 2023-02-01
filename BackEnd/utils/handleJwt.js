const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
/**
 * Para generar el jwt se debe pasar el usuario
 * @param {} user 
 */
const tokenSign = async (user) => {
    const sign = await jwt.sign({
        _id: user._id,
    },
    JWT_SECRET,
    {
        expiresIn:"30d"
    }
    )
    return sign
}

/*
Se debe pasar token de sesion*/
const verifyToken = async (tokenJWT) => {
    try{
        return jwt.verify(tokenJWT,JWT_SECRET)
    } catch(e){
        return null
    }

}

module.exports = {tokenSign, verifyToken}