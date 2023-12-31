import { Hash } from "lucide-react";
import React from "react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="space-y-2 px-4 mb-4 ">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full flex items-center justify-center">
          <Hash className="w-12 h-12 text-white" />
        </div>
      )}
      <p className="text-xl md:text-3xl font-bold">
        {type === "channel" ? "Welcome to #" : ""}
        {name}
      </p>
      <p className="text-sm text-[#92B4CB]">
        {type === "channel"
          ? `This the the start of #${name}`
          : `This is the start of the conversation with ${name}`}
      </p>
    </div>
  );
};

export default ChatWelcome;
