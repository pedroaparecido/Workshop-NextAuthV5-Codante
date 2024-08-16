'use server'

import { signIn } from "../../../auth"

export default async function handleGithub() {
    //SÓ FUNCIONARIA SE FOSSE EMAIL MAS COMO É EMUSER NÃO SALVA NO BANCO DE DADOS
    await signIn('github')
}