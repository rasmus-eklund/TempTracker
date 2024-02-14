"use client";
import { api } from "~/trpc/react";
import SampleForm from "./SampleForm";
import { useRef } from "react";
import Icon from "~/icons/Icon";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

const AddTempButton = () => {
  const modal = useRef<HTMLDialogElement>(null);
  const toggleModal = () => {
    if (!modal.current) {
      return;
    }
    modal.current.hasAttribute("open")
      ? modal.current.close()
      : modal.current.showModal();
  };
  const router = useRouter();
  const { mutate, isLoading } = api.temp.create.useMutation({
    onSuccess: async () => {
      router.refresh();
      toggleModal();
    },
  });
  return (
    <div className="bg-c2 flex items-center gap-2 rounded-md">
      <button onClick={toggleModal}>
        <Icon icon="plus" className="fill-c4 h-10 w-10" />
      </button>
      <p>Add measurement</p>
      <Modal ref={modal} toggleModal={toggleModal}>
        <SampleForm
          disabled={isLoading}
          onSubmit={mutate}
          onCancel={toggleModal}
        />
      </Modal>
    </div>
  );
};

export default AddTempButton;
