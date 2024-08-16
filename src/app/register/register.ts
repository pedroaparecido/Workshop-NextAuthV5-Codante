'use server'

import { redirect } from "next/navigation"
import db from "../../../lib/db"
import { UserForm } from "../component/form/form"

import { hashSync } from "bcrypt-ts"

export default async function handleRegister(data: UserForm) {
    if (!data.emuser || !data.password) {
        throw new Error("Os campos devem estar preenchidos!")
    }

    const user = await db.user.findUnique({
        where: {
            emuser: data.emuser
        }
    })

    if (user) {
        throw new Error("Esse usuário já existe")
    }

    await db.user.create({
        data: {
            emuser: data.emuser,
            password: hashSync(data.password)
        }
    })

    redirect('/')
}