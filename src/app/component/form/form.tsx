import { useForm } from "react-hook-form";

import { getSession, signIn, useSession } from "next-auth/react";
import handleRegister from "../../register/register";
import handleLogin from "../../login-server/login";
import { useState } from "react";
import { useRouter } from "next/navigation"
import handleGithub from "@/app/github/login";
import handleEmail from "@/app/email/email";
//import { handleToken } from "../../api/login/formlogin.cjs"

export interface UserForm {
  id: string,
  emuser: string,
  password: string
}

export default function Form() {
  const { handleSubmit, register } = useForm<UserForm>()
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()

      /* LOGIN COM SERVER
      const handleAuth = async (data: UserForm) => {
        handleLogin(data)
      }*/

    /*LOGIN COM CLIENT
    const handleAuth = async (data: UserForm) => {
    const emuser = data.emuser
    const password = data.password
    
    signIn('credentials', {
      emuser,
      password,
      redirect: false,
      callbackUrl: '/'
    }).then(res => {
      if (res && res.error === 'CredentialsSignin') {
        setError('Credenciais inválidas')
      } else {
        router.push('/')
      }
    })
  }*/

  /*LOGIN COM SERVIÇOS DE PROVIDERS TIPO GITHUB GOOGLE
  const handleAuth = async () => {
    handleGithub()
  }*/

  const handleAuth = async (data: UserForm) => {
    handleEmail(data)
  }

/*LOGIN SERVER E CLIENT
  return (
    <form onSubmit={handleSubmit(handleAuth)} className="flex flex-col min-h-screen items-center justify-center bg-slate-200">
      <input className="p-[10px] outline-none mb-[15px]" type="text" placeholder="usuário" {...register("emuser")} name="emuser" />
      <input className="p-[10px] outline-none mb-[15px]" type="password" placeholder="senha" {...register("password")} name="password" />
      {
        error &&
        <p className="text-red-500 text-sm mt-8 text-center">{error}</p>
      }
      <button className="p-[15px] bg-white w-[250px] mt-[10px] text-slate-400">Entrar</button>
    </form>
  );*/

  //LOGIN COM OUTROS PROVIDERS TIPO GITHUB, GOOGLE E LINK MÁGICO PARA O EMAIL
  return (
    <form className="flex flex-col min-h-screen items-center justify-center bg-slate-200" onSubmit={handleSubmit(handleAuth)}>
      <input className="p-[10px] outline-none mb-[15px]" type="text" placeholder="email" {...register("emuser")} name="emuser" />
      <button className="p-[15px] bg-white w-[250px] mt-[10px] text-slate-400">Receba um link de acesso no seu email!</button>
    </form>
  )
}
