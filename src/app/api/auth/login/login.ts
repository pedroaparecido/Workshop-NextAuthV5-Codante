'use server'

import { UserForm } from "@/app/component/form/form";
import { signIn } from "../../../../../auth";

export default async function handleLogin(data: UserForm) {
    const emuser = data.emuser
    const password = data.password
    
    await signIn('credentials', { emuser, password})
}