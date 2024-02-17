// useContext is used in another component, so in this provider we set client-side rendering
"use client"

import { SessionProvider } from 'next-auth/react'
import React from 'react'

// Setup next-auth provider to wrap all pages with this provider
function Provider({children, session}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider