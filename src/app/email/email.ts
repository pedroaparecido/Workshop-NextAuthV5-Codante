'use server'

import { signIn } from "../../../auth"
import { UserForm } from "../component/form/form"

export default async function handleEmail(data: UserForm) {
    //SÓ FUNCIONARIO CASO FOSSE UM 'EMAIL' COMO É UM EMAIL USER NÃO FUNCIONARÁ
    //NO WORKSHOP É USADO O NODEMAILER EU JÁ FIZ COM O EMAILJS QUE O SERVIÇO É GRATUITO MAS NÃO TEM O LINK MÁGICO PARA AUTENTICAÇÃO, O AUTOR DO VIDEO INDICA O RESEND NÃO É GRATUITO, MAS TEM COMO FAZER TESTES
    const emuser = data.emuser
    await signIn('nodemailer', { emuser })
}