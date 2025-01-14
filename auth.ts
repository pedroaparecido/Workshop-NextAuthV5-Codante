import NextAuth, { User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from "./lib/db"
import { compareSync } from "bcrypt-ts"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from 'next-auth/providers/nodemailer'
import { PrismaClient } from "@prisma/client"

declare module 'next-auth' {
    interface Session {
        user: User & {
            githubProfile?: any
        }
    }
}

const prisma = new PrismaClient()

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    providers: [Credentials({
        credentials: {
            emuser: {
                label: 'Emuser'
            },
            password: {
                label: 'Password',
                type: 'password'
            }
        },
        async authorize(credentials) {
            const emuser = credentials.emuser as string
            const password = credentials.password as string
            if (!credentials.emuser || !credentials.password) {
                return null
            }
            const user = await db.user.findUnique({
                where: {
                    emuser: emuser,
                }
            })
            
            if (!user) {
                return null
            }
            
            const matches = compareSync(password, user.password as string)
            
            if (matches) {
                return { id: user.id, name: user.emuser, email: user.password }
            }
            return null
        }
    }),
    GithubProvider({
        allowDangerousEmailAccountLinking: true
    }),
    EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
],
callbacks: {
    jwt({token, profile}) {
        console.log(profile)
        return {githubProfile: profile, ...token}
    },
    session({session, token}) {
        const githubProfile = token.githubProfile
        session.user.githubProfile = token.githubProfile
        return session
    }
}
})