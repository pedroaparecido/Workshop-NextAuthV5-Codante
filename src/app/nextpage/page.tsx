import { useSession } from "next-auth/react"

export default async function NextPage() {
    return(
        <div className="flex flex-col min-h-screen items-center justify-center bg-slate-200">
            <div className="p-[20px]">
                <label htmlFor="">Olá </label>
            </div>
        </div>
    )
}