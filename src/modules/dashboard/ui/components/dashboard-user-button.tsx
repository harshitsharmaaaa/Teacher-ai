// import { authClient } from "@/lib/auth-client"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Skeleton } from "@/components/ui/skeleton";
// import { UserRound, Settings, LogOut, UserRoundCog } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { on } from "events";

// export const DashBoardUserButton = () => {
//   const router = useRouter();
//   const { data, isPending, error } = authClient.useSession();

//   const onLogout = async()=>{
//     await authClient.signOut({
//         fetchOptions: {
//             onSuccess:()=>{
//                 router.push("/sign-in");
//             }
//         }
//     })
    
//   }

//   const handleNavigation = (path: string) => {
//     router.push(path);
//   };

//   if (error) {
//     console.error("Session error:", error);
//     return null;
//   }

//   if (isPending) {
//     return (
//       <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
//     );
//   }

//   if (!data?.user) return null;

//   const getUserInitials = () => {
//     if (!data.user.name) return null;
//     const names = data.user.name.split(" ");
//     return names
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase()
//       .substring(0, 2);
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <button 
//           className="
//             flex h-10 w-10 items-center justify-center rounded-full
//             bg-primary text-white cursor-pointer transition-all
//             hover:opacity-90 focus:outline-none focus:ring-2
//             focus:ring-primary focus:ring-offset-2
//             relative overflow-hidden border-2 border-white
//             shadow-md
//           "
//           aria-label="User menu"
//         >
//           {data.user.image ? (
//             <img 
//               src={data.user.image} 
//               alt="User profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <span className="font-medium text-sm">
//               {getUserInitials() || (
//                 <UserRound className="w-5 h-5" />
//               )}
//             </span>
//           )}
//         </button>
//       </DropdownMenuTrigger>
      
//       <DropdownMenuContent 
//         align="end"
//         className="w-64 rounded-lg shadow-lg border border-gray-100"
//       >
//         <DropdownMenuLabel className="px-4 py-3">
//           <div className="flex flex-col">
//             <span className="font-semibold truncate">
//               {data.user.name || data.user.email}
//             </span>
//             {data.user.name && (
//               <span className="text-xs text-muted-foreground font-normal mt-1 truncate">
//                 {data.user.email}
//               </span>
//             )}
//           </div>
//         </DropdownMenuLabel>
        
//         <DropdownMenuSeparator className="my-1" />
        
//         <DropdownMenuItem
//           onClick={() => handleNavigation("/profile")}
//           className="px-4 py-2.5 cursor-pointer hover:bg-gray-50"
//         >
//           <UserRound className="w-4 h-4 mr-3 text-muted-foreground" />
//           <span>Profile</span>
//         </DropdownMenuItem>
        
//         <DropdownMenuItem
//           onClick={() => handleNavigation("/settings")}
//           className="px-4 py-2.5 cursor-pointer hover:bg-gray-50"
//         >
//           <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
//           <span>Settings</span>
//         </DropdownMenuItem>
        
//         <DropdownMenuItem
//           onClick={() => handleNavigation("/account")}
//           className="px-4 py-2.5 cursor-pointer hover:bg-gray-50"
//         >
//           <UserRoundCog className="w-4 h-4 mr-3 text-muted-foreground" />
//           <span>Account</span>
//         </DropdownMenuItem>
        
//         <DropdownMenuSeparator className="my-1" />
        
//         <DropdownMenuItem
//           onClick={onLogout}
//           className="px-4 py-2.5 cursor-pointer hover:bg-red-50 text-red-600 focus:text-red-700 focus:bg-red-50"
//         >
//           <LogOut className="w-4 h-4 mr-3"  onClick={onLogout}/>
//           <span>Log out</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

import { authClient } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRound, Settings, LogOut, UserRoundCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const DashBoardUserButton = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { data, isPending, error } = authClient.useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || isPending) {
    return <Skeleton className="h-10 w-10 rounded-full bg-gray-200" />;
  }

  if (error) {
    console.error("Session error:", error);
    return null;
  }

  if (!data?.user) return null;


  const OnLogout = ()=>{
     authClient.signOut({
        fetchOptions: {
            onSuccess:()=>{
                router.push("/sign-in");
            }
        }
    })
    
  }

  const getUserInitials = () => {
    if (!data.user.name) return null;
    const names = data.user.name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className="
            flex h-10 w-10 items-center justify-center rounded-full
            bg-primary text-white cursor-pointer transition-all
            hover:opacity-90 focus:outline-none focus:ring-2
            focus:ring-primary focus:ring-offset-2
            relative overflow-hidden border-2 border-white
            shadow-md
          "
          aria-label="User menu"
        >
          {data.user.image ? (
            <img 
              src={data.user.image} 
              alt="User profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <span className="font-medium text-sm">
              {getUserInitials() || (
                <UserRound className="w-5 h-5" />
              )}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end"
        className="w-64 rounded-lg shadow-lg border border-gray-100"
      >
        <DropdownMenuLabel className="px-4 py-3">
          <div className="flex flex-col">
            <span className="font-semibold truncate">
              {data.user.name || data.user.email}
            </span>
            {data.user.name && (
              <span className="text-xs text-muted-foreground font-normal mt-1 truncate">
                {data.user.email}
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuItem
          onClick={() => router.push("/profile")}
          className="px-4 py-2.5 cursor-pointer hover:bg-gray-50"
        >
          <UserRound className="w-4 h-4 mr-3 text-muted-foreground" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => router.push("/settings")}
          className="px-4 py-2.5 cursor-pointer hover:bg-gray-50"
        >
          <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => router.push("/account")}
          className="px-4 py-2.5 cursor-pointer hover:bg-gray-50"
        >
          <UserRoundCog className="w-4 h-4 mr-3 text-muted-foreground" />
          <span>Account</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="my-1" />
        
        <DropdownMenuItem
          onClick={OnLogout}
          className="px-4 py-2.5 cursor-pointer hover:bg-red-50 text-red-600 focus:text-red-700 focus:bg-red-50"
        > 
          <LogOut className="w-4 h-4 mr-3" onClick={OnLogout} />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};