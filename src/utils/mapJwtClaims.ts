import { ClaimName, UserClaims } from "../http/authApi";
import { User } from "../store/UserStore";

type Claim = "name" | "role";

type MappedClaims = {
    [key in Claim]?: string;
}

export const mapJwtClaims = (jwtClaims: UserClaims): User => {
    const mapping: { [key in ClaimName]: string } = {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": "name",
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "role"
    };

    const result: MappedClaims = {};
    for (const key in jwtClaims) {
        const mappedKey = mapping[key as ClaimName] || key;
        result[mappedKey as Claim] = jwtClaims[key as ClaimName];
    }

    return result as User;
};

export default mapJwtClaims;