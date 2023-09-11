import { Hash } from "lucide-react";
import React from "react";
import MobileToggle from "../mobile-toggle";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = ({ name, serverId, imageUrl, type }: ChatHeaderProps) => {
  return (
    <div className="text-md font-semibold px-3 flex h-12 items-center border-neutral-200 dark:border-[#374151] border-b-2">
        <MobileToggle serverId={serverId}/>
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-white/50 mr-2"/>
      )}
      <p className="font-semibold text-md dark:text-white text-black">{name}</p>
    </div>
  );
};

export default ChatHeader;