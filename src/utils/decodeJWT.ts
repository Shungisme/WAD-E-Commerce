import { jwtDecode } from "jwt-decode"


export const decodeJwt = (jwt:string) =>{
    return jwtDecode(jwt);
}