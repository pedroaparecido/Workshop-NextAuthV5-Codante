'use server'

import { UserForm } from "@/app/component/form/form"

import db from "../../../../../../lib/db"

import { hashSync } from "bcrypt-ts"
import { redirect } from "next/navigation"

export default async function handleRegister(data: UserForm) {
    if (!data.emuser || !data.password) throw new Error('Os campos devem estar preenchidos')

    const user = await db.user.findUnique({
        where: {
            emuser: data.emuser
        }
    })

    if (user) {
        throw new Error('Esse usuário já existe')
    }

    const create = await db.user.create({
        data: {
            emuser: data.emuser,
            password: hashSync(data.password)
        }
    })

    //redirect('/nextpage')

    return create
}