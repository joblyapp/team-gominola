const bcryptjs = require("bcryptjs")

/**
 * Contraseña plana para ser excryptada
 * @param {} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain,10)
    return hash
}

/**
 * Comparar contraseña de base de datos (encriptada)
 * y comparar con contraseña ingresada por usuario
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain,hashPassword)
}

module.exports = {encrypt,compare}