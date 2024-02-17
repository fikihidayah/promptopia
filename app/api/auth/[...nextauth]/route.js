// best practice as mentioned admin jsmastery channel, we are gonna using dynamic route with [...nameofvariable]
// and consider of documentation prefrered using this route as authentication

import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

import User from '@/models/user'
import { connectToDB } from "@/utils/databases";

// we define that's next auth configuration, in this case we use Google Authentication
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 10000
            }
        })
    ],
    callbacks: {
        // Setup Next Auth Session
        // token param is available when strategy is jwt(default) and user param is available wheter database stategy, that was we configure session strategy
        async session({ session, token, user }) {
            try {
                const sessionUser = await User.findOne({
                    email: session.user.email,
                })

                // append session token properties for session client side
                session.user.id = sessionUser._id.toString()
                return session
            } catch (error) {
                console.log(error.message)
            }
        },
        // Setup Next Auth Sign In Action, that we can use in Nav once clicked submit button
        async signIn({ profile }) {
            try {
                // Serverless 
                await connectToDB()

                // check if a user alredy axists
                const userExists = await User.findOne({ email: profile.email })

                // if not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                }

                return true
            } catch (error) {
                // return false
                return '/unauthorized'
            }
        },
    }
})

export { handler as GET, handler as POST }