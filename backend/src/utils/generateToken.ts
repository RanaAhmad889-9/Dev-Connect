import jwt, {Secret, SignOptions} from 'jsonwebtoken'

import { TJwtPayload } from "../interfaces/jwt.types";

const generateToken=(
    payload:TJwtPayload,
    secret:Secret,
    expiresIn:SignOptions["expiresIn"]
)=>{
    return jwt.sign(payload,secret,{
        expiresIn,
    })
};

export default generateToken;



