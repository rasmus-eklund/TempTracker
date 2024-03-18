"use client";
import { api } from "~/trpc/react";
import SampleForm from "./SampleForm";
import { useRef, useState } from "react";
import Icon from "~/icons/Icon";
import Modal from "./Modal";
import { useRouter } from "next/navigation";

const AddTempButton = () => {
  const [today, setToday] = useState(new Date());
  const modal = useRef<HTMLDialogElement>(null);
  const toggleModal = () => {
    if (!modal.current) {
      return;
    }
    setToday(new Date());
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
    <div className="flex items-center gap-2 rounded-md bg-c2">
      <button onClick={toggleModal}>
        <Icon icon="plus" className="h-10 w-10 fill-c4" />
      </button>
      <p>Add measurement</p>
      <Modal ref={modal} toggleModal={toggleModal}>
        <SampleForm
          data={{ date: today, temp: 36.6 }}
          disabled={isLoading}
          onSubmit={mutate}
          onCancel={toggleModal}
        />
      </Modal>
    </div>
  );
};

export default AddTempButton;
