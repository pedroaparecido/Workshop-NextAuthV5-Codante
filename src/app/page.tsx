'use client'

import { redirect } from "next/navigation"
import { auth } from "../../auth"
import handleLogout from "./logout/logout"

export default async function Home() {

  const session = await auth()
  //console.log(session)
  /*if (!session) {
    redirect('/login-client')
  }
  redirect('/')*/
  

  return(
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p>Olá {session?.user?.name}</p>
        <form action={handleLogout}>
          <button className="bg-slate-200 p-[20px] rounded-md mt-[10px]">Logout</button>
        </form>
      </div>
  )
}