import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
  params: {
    channelId: string;
    serverId: string;
  };
}

const ChannelIdPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) return redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) return redirect("/");
  return (
    <div className="bg-white dark:bg-[#1B1D2E] dark:bg-opacity-50 h-full flex flex-col">
      <ChatHeader type="channel" serverId={params.serverId} name={channel.name}/> 

      <div className="flex-1">
        Messages
      </div>

      <ChatInput name={channel.name} apiUrl={`/api/socket/messages`} type="channel" query={{
        channelId: channel.id,
        serverId: channel.serverId,
      }}/>
    </div>
  );
};

export default ChannelIdPage;
