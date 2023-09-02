"use client";

import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { useModalStore } from "@/hooks/use-modal-store";

const NavigationAction = () => {

  const {onOpen} = useModalStore();

  return (
    <>
      <ActionTooltip side="right" label="Add a server" align="center">
        <button className="group flex items-center" onClick={() => onOpen("createServer")}>
          <div className="flex m-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-[#272A3E] group-hover:bg-[#6DFD60]/80">
            <Plus
              className="group-hover:text-white transition text-[#6DFD60]/90"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </>
  );
};

export default NavigationAction;
