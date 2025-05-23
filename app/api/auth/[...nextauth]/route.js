import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient()

export const authOptions = {

    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                

                if (!credentials.email || !credentials.password) {
                    return null;
                }

                // user in DB

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })


                if (!user) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, user.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user?.email,
                    username: user?.username,
                    role: user.role
                }


            }
        }),
    ],

    callbacks: {

        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    email: token.email,
                    username: token.username,
                    role: token.role,
                }
            }

        },

        async jwt({ token, user }) {

            if (user) {
                return {
                    ...token,
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                }
            }
            return token
        }
    },

    pages: {
        signIn: '/login'
    },

    debug: process.env.NODE_ENV === 'development',
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET


}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }
