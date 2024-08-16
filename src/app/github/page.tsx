'use client'

import { useSession } from "next-auth/react"
import Form from "../component/form/form"
import { redirect, useRouter } from "next/navigation"
import { auth } from "../../../auth"

export default async function LoginGithub() {
    return <Form />
}