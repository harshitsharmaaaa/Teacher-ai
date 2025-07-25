import { createAuthClient } from "better-auth/react"
// import { SessionPlugin } from "better-auth/plugins";
export const authClient = createAuthClient({
//     plugins: [
//     sessionPlugin({
//       query: {
//         staleTime: 1000 * 60 * 5,          // 5 minutes cache
//         refetchOnWindowFocus: false,
//         refetchOnMount: false,
//         refetchInterval: false,
//         retry: false,
//       },
//     }),
//   ],
    
})