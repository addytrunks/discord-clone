"use client";

import qs from 'query-string'
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components//ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/hooks/use-modal-store";

const DeleteChannelModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onClose, data, type } = useModalStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { server,channel } = data;

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url:`/api/channels/${channel?.id}`,
        query:{
            serverId:server?.id,
        }
      })

      await axios.delete(url);
      
      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  const isModalOpen = isOpen && type === "deleteChannel";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden p-0">
        <DialogHeader className="pt-8">
          <DialogTitle className="text-3xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            <span className="font-semibold text-indigo-500">
              #{channel?.name}{" "}
            </span>
            will be permanently deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              variant="ghost"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} variant="primary" onClick={onSubmit}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
