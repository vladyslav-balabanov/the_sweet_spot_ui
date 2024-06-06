import { jwtDecode } from 'jwt-decode';
import { ILoginViewModel } from "../interfaces/ViewModels/ILoginViewModel.js";
import { $authhost, $host } from './index'

export type ClaimName = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name" | "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
export type UserClaims = {
    [key in ClaimName]:string;
}

export const login = async (loginData: ILoginViewModel) => {
    const { data } = await $host.post('api/auth/login', loginData)
    localStorage.setItem('token', data.jwtToken)
    return jwtDecode(data.jwtToken) as UserClaims;
}

export const checkToken = async () => {
    const {data} = await $authhost.post('api/auth/checkSignIn')
}