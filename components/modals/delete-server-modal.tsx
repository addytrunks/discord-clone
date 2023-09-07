"use client";

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

const DeleteServerModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onClose, data, type } = useModalStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { server } = data;

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/servers/${server?.id}`);
      
      onClose();
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  const isModalOpen = isOpen && type === "deleteServer";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black overflow-hidden p-0">
        <DialogHeader className="pt-8">
          <DialogTitle className="text-3xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this?
            <br />
            <span className="font-semibold text-indigo-500">
              {server?.name}{" "}
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

export default DeleteServerModal;
