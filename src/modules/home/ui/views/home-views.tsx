"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/app/api/trpc/client";
import { useQuery } from "@tanstack/react-query";
const  HomeView= () => {
  // const {data:session} = authClient.useSession();
  // const router = useRouter();
  // return (
  //   <div className="flex flex-col p-4 gap-y-400
  //   items-center justify-center min-h-screen bg-muted">
  //     <div className="flex flex-col items-center justify-center">
  //       <h1 className="text-4xl font-bold">
  //         {session ? `Welcome back, ${session.user.name}` : "Welcome to the App!"}
  //       </h1>
  //       <Button className="bg-primary text-white" onClick={() => authClient.signOut({
  //           fetchOptions: {
  //               onSuccess:()=>{
  //                   router.push("/sign-in");
  //               }

  //           }
  //       })}>
  //       Sign Out</Button>
  //     </div> 
      
  //   </div>
  //)


    const trpc = useTRPC();
    const{data} = useQuery(trpc.hello.queryOptions({text:"Harshit"}))

    return(

        <div >
          {data?.greeting}
        </div>
    )

}

export default HomeView;
