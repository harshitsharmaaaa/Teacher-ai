import Link  from "next/link";
import { Button } from "@/components/ui/button";



export const CallEnd=()=>{
   


    return(
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-200 via-pink-100 to-purple-200">
            <div className="flex flex-1 items-center justify-center w-full px-4">
                <div className="flex flex-col items-center justify-center gap-y-8 bg-white/90 rounded-2xl p-12 shadow-2xl border border-gray-200 max-w-md w-full">
                    <div className="flex flex-col items-center gap-y-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-2 shadow">
                            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0A9 9 0 11 3 12a9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Call Ended
                        </h2>
                        <p className="text-base text-gray-600">
                            Your call has ended successfully.<br />
                            The summary will appear here in a few minutes.
                        </p>
                    </div>
                    <Button asChild variant="default" className="w-full py-3 text-base font-semibold rounded-lg shadow-md bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                        <Link href="/meetings">
                            Back to Meetings
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}