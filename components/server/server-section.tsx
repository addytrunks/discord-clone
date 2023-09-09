"use client"

import { ServersWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import ActionTooltip from "../action-tooltip";
import { Cog, Plus } from "lucide-react";
import { useModalStore } from "@/hooks/use-modal-store";

interface ServerSectionProps {
    label: string;
    role?:MemberRole;
    sectionType:'channels' | 'members'
    channelType?:ChannelType,
    server?:ServersWithMembersWithProfiles
}

const ServerSection = ({label,sectionType,channelType,role,server}:ServerSectionProps) => {

    const {onOpen} = useModalStore();

  return (
    <div className="flex items-center justify-between py-2">
        <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-white">
            {label}
        </p>
        {role !== MemberRole.GUEST  && sectionType === 'channels' && (
            <ActionTooltip label="Create Channel" side="top">
                <button onClick={() => onOpen('createChannel',{server,channelType})} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                    <Plus className="w-4 h-4"/>
                </button>
            </ActionTooltip>
        )}
        {role === MemberRole.ADMIN && sectionType === 'members' && (
            <ActionTooltip label="Manage Members" side="top">
                <button onClick={() => onOpen('members',{server})} className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                    <Cog className="w-4 h-4"/>
                </button>
            </ActionTooltip>
        )}
    </div>
  )
}

export default ServerSection