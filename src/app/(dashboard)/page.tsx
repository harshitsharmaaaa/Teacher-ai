import { auth } from "@/lib/auth";
import HomeView from "@/modules/home/ui/views/home-views";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const  page= async() => {
 
  const session = await auth.api.getSession({
    headers: await headers(),

  })

  if(!session) {
    redirect("/sign-in");
  }
  
  return (
    <HomeView/>
  )
}

export default page;
