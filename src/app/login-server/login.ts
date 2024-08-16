'use server'

import { AuthError } from "next-auth";
import { signIn } from "../../../auth";
import { UserForm } from "../component/form/form";

export default async function handleLogin(data: UserForm) {
    const emuser = data.emuser
    const password = data.password

    try {
        await signIn('credentials', { emuser, password })
    } catch (err) {
        if (err instanceof AuthError) {
            if (err.type === 'CredentialsSignin') {
                err.message = 'Credenciais inválidas'
                throw err
            }
        }
    }
}