"use client";
import React, { useEffect } from "react";

import { Modal, ModalContent, ModalBody, useDisclosure } from "@heroui/react";
import Image from "next/image";
import loader from "@/assets/images/loader.gif";

export default function CustomLoader() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody className="p-10 flex justify-center items-center w-full">
                <Image
                  src={loader}
                  alt="loader"
                  width={200}
                  height={200}
                  className="w-60 h-60"
                />
                <p className="text-2xl font-bold text-center text-primary">
                  Please wait... Generating story...
                </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
