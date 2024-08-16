'use client'

import { useSession } from "next-auth/react"
import Form from "../component/form/form"
import { redirect, useRouter } from "next/navigation"

export default function LoginClient() {

    
    const session = useSession()
    console.log(session)
    /*if (session.status === 'authenticated') {
        redirect('/')
    }*/

    return <Form />
}