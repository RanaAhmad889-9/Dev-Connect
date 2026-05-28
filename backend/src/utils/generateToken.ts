import jwt, {Secret, SignOptions} from 'jsonwebtoken'

const generateToken=(
    payload:Object,
    secret:Secret,
    expiresIn:SignOptions["expiresIn"]
)=>{
    return jwt.sign(payload,secret,{
        expiresIn,
    })
};

export default generateToken;



