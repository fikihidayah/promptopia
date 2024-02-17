"use client"

// Import pre-build Next Component, this components is optimized by next
import Link from "next/link"
import Image from "next/image"

// To use react hooks, this component must use client-side rendering
import { useState, useEffect } from "react"
// use next-auth authentication features
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

function Nav() {
  const {data:session} = useSession()

  // Set provider auth state
  const [providers, setProviders] = useState(null)
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()

      setProviders(response)
    }
    
    // set provider at component rendered
    setUpProviders() // geting session of authentication, for more detail please check next-auth documentation: https://next-auth.js.org/getting-started/introduction
  }, [])


  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className="flex gap-2 flex-center">
        <Image src='/assets/images/logo.svg' width={30} height={30} aria-level={'Promptopia Logo'} alt="LOGO" />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href='/create-prompt'>
              Create Post
            </Link>

            <button className="outline_btn" type="button" onClick={signOut}>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
            </Link>
          </div>
        ) : (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                // Sign in with next-auth providers, in this case we use google auth
                <button type="button" 
                  key={provider.name} 
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
          {
            session?.user ? (
              <div className="flex">
                <Image src={session?.user.image} 
                  width={37} 
                  height={37} 
                  className="rounded-full" 
                  alt="profile" onClick={() => setToggleDropdown((prev) => !prev)} />

                  {toggleDropdown && (
                    <div className='dropdown'>
                      <Link className="dropdown_link" 
                        onClick={() => setToggleDropdown(false)}
                        href='/profile'
                        >
                          My Profile
                      </Link>
                      <Link className="dropdown_link" 
                        onClick={() => setToggleDropdown(false)}
                        href='/create-propmt'
                        >
                          Create Prompt
                      </Link>
                      <button 
                        type="button" 
                        onClick={() => {
                          setToggleDropdown(false)
                          signOut()
                        }} className="mt-5 w-full black_btn">
                          Sign Out
                      </button>
                    </div>
                  )}
              </div>
            ) : (
              <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button type="button" 
                  key={provider.name} 
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
            )
          }
      </div>
    </nav>
  )
}

export default Nav