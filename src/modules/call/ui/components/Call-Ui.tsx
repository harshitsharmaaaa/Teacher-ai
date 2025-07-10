"use client"
import { StreamTheme,useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-active";
import { CallEnd } from "./call-end";
interface Props {
    meetingName:string;
}
const CallUi=({meetingName}:Props)=>{
    const call = useCall();
    const [show,setshow]=useState<"lobby"|"in-call"|"ended">("lobby");

    const handleJoin = async() => {
        if(!call){
            return;
        }
        await call.join();
        setshow("in-call");
    }

    const handleLeave = () => {
        if(!call) return;
         
        call.endCall();
        setshow("ended");
    }
  return (
    <StreamTheme className="h-full">
        {show==="lobby" && <CallLobby
            onJoin={handleJoin}
        />}
        {show==="in-call" && <CallActive
        onLeave={handleLeave}
        meetingName={meetingName}
        />}
        {show==="ended" && <CallEnd/>}
      
    </StreamTheme>
  )
}

export default CallUi
