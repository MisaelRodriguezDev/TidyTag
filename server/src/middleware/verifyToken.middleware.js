import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { AuthError } from "../errors";

configDotenv();

/**
 * @module Middleware/VerifyToken
 */

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */


/**
 * Middleware para verificar el token JWT en el encabezado de autorización de la solicitud.
 * @function
 * @param {Request} req - El objeto de solicitud HTTP.
 * @param {Response} res - El objeto de respuesta HTTP.
 * @param {NextFunction} next - La función que llama al siguiente middleware.
 * @returns Si el token es válido, continúa con la siguiente función de middleware. 
 * De lo contrario, responde con un estado de error.
 * @memberof module:Middleware
 */
const verifyToken = (req, res, next) => {
    const header = req.header("Authorization");
    if (!header) {
        throw new AuthError()
    }
    const token = header.split(" ")[1];
    if (!token) {
        throw new AuthError()
    }
    //@ts-ignore
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            throw new AuthError(err.message)
        }
        // @ts-ignore
        req.user = user;
    })
    next();
}

export default verifyToken;