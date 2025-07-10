import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { CallControls,SpeakerLayout } from "@stream-io/video-react-sdk";

interface Props{
    onLeave:()=>void;
    meetingName:string;
}

// export const CallActive=({onLeave,meetingName}:Props)=>{
//     return(
//         <div className="flex flex-col  justify-between h-full p-4 text-white">
//             <div className="bg-[#101213] rounded-full p-4 flex-items items-center gap-4">
//                 <Link href="/" className="flex items-center justify-center p-1 bg-white/10 rounded-full w-full">
//                     <Image src="/logo.svg" alt="Logo" width={22} height={22}/>
//                 </Link>
//                 <h4 className="text-base">
//                     {meetingName}
//                 </h4>
//             </div>
//             <SpeakerLayout/>
//             <div className="bg-[#101213] rounded-full px-4">
//                 <CallControls
//                 onLeave={onLeave}
//                 />
//             </div>

//         </div>
//     )
// }

export const CallActive = ({ onLeave, meetingName }: Props) => {
    return (
        <div className="flex flex-col justify-between h-full p-6 bg-[#0e0f11] text-white">
            <div className="flex items-center gap-3 mb-6">
                <Link href="/" className="flex items-center justify-center bg-white/10 rounded-full w-10 h-10 hover:bg-white/20 transition">
                    <Image src="/logo.svg" width={20} height={20} alt="Logo" />
                </Link>
                <span className="text-lg font-semibold truncate">{meetingName}</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-3xl">
                    <SpeakerLayout />
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <div className="bg-[#18191c] rounded-full px-6 py-3 shadow-lg flex items-center">
                    <CallControls onLeave={onLeave} />
                </div>
            </div>
        </div>
    );
}
