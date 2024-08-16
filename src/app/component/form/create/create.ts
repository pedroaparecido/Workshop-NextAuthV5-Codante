"use server"

import { redirect } from "next/navigation"
import db from "../../../../../lib/db"
import { FormEvent } from "react"
import { UserForm } from "../form"

export default async function handleRegister(data: UserForm) {
    if (!data.emuser) throw new Error('Os campos devem estar preenchidos!')

    const user = await db.user.findUnique({
        where: {
            emuser: data.emuser
        }
    })

    if (user) {
        throw new Error('Esse usuário já existe')
    }

    const newUser = await db.user.create({
        data: {
            emuser: data.emuser,
            password: data.password
        }
    })

    redirect('/nextpage')

    return user
}