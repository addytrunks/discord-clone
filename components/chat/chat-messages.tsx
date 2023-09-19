"use client";

import { Member, Message, Profile } from "@prisma/client";
import ChatWelcome from "./chat-welcome";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";

type MessageWithMemberWithProfile =  Message & {
    member: Member & {
        profile: Profile;
    }
}

interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  //   To fetch the messages
  apiUrl: string;
  //   To upload the messages
  socketUrl: string;
  socketQuery: Record<string, any>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useChatQuery({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
  });

  if (status === "loading")
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="w-7 h-7 animate-spin my-4" />
        <p className="text-xs">Loading Messages</p>
      </div>
    );

  if (status === "error")
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <ServerCrash className="w-7 h-7 my-4" />
        <p className="text-xs">Something went wrong</p>
      </div>
    );
  return (
    <div className="flex-1 flex flex-col overflow-y-auto py-4">
      <div className="flex-1" />
      <ChatWelcome name={name} type="channel" />

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((group,i) => (
            <Fragment key={i}>
                {group.items.map((message:MessageWithMemberWithProfile) => (
                    <div key={message.id}>
                        {message.content}
                    </div>
                ))}
            </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
