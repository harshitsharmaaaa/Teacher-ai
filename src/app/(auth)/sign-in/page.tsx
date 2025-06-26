import { SignInViews } from '@/modules/auth/ui/views/sign-in-views'
import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

const page = async() => {
  const session = await auth.api.getSession({
      headers: await headers(),
  
    })
  
    if(!!session) {
      redirect("/");
    }
  return (
    <SignInViews/>
  )
}

export default page
