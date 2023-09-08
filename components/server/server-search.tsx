"use client";

import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useParams, useRouter } from "next/navigation";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[],
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "channel" | "member";
  }) => {
    setOpen(false);
    if(type === 'member'){
        router.push(`/servers/${params?.serverId}/conversations/${id}`)
    }

    if(type === 'channel'){
        router.push(`/servers/${params?.serverId}/channels/${id}`)
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:bg-[#272A3E] dark:bg-opacity-50 transition py-2 hover:dark:bg-opacity-70"
      >
        <SearchIcon className="w-4 h-4 text-zinc-500 dark:text-gray-700 text-primary" />
        <p className="font-semibold text-sm opacity-50">Search</p>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-xs font-medium text-muted-foreground ml-auto border-[#0E111F] border-opacity-60">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members " />

        <CommandList>
          <CommandEmpty>No Results found.</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ icon, name, id }) => {
                  return (
                    <CommandItem onSelect={() => onClick({id,type})} key={id}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
