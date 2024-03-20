"use client";

import { useRef, useState, type ReactNode } from "react";
import Modal from "~/app/_components/Modal";
import Icon from "~/icons/Icon";
import { type RouterOutputs } from "~/trpc/shared";
import RemoveModal from "./RemoveModal";
import SampleForm from "./SampleForm";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type Temp = RouterOutputs["temp"]["read"][number];
type Props = {
  item: Temp;
};
const Sample = ({ item }: Props) => {
  const modal = useRef<HTMLDialogElement>(null);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const toggleModal = () => {
    if (!modal.current) {
      return;
    }
    modal.current.hasAttribute("open")
      ? modal.current.close()
      : modal.current.showModal();
  };
  const router = useRouter();
  const { mutate: update, isLoading: updating } = api.temp.update.useMutation({
    onSuccess: () => {
      router.refresh();
      toggleModal();
    },
  });

  return (
    <li className="flex select-none items-center justify-between gap-2 rounded-md bg-c2 p-2">
      <p>
        {item.date.toLocaleString("sv-SE", {
          day: "2-digit",
          year: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </p>
      <div className="flex items-center gap-2">
        <Icon icon="temp" className="h-6 w-6 fill-c3" />
        <p>{item.temp.toFixed(2)}</p>
        <button
          onClick={() => {
            setModalContent(
              <SampleForm
                disabled={updating}
                onSubmit={({ date, temp }) =>
                  update({ date, temp, id: item.id })
                }
                data={item}
                onCancel={toggleModal}
              />,
            );
            toggleModal();
          }}
        >
          <Icon icon="edit" className="h-6 w-6 fill-black" />
        </button>
        <button
          onClick={() => {
            setModalContent(
              <RemoveModal toggleModal={toggleModal} id={item.id} />,
            );
            toggleModal();
          }}
        >
          <Icon icon="close" className="h-6 w-6 fill-c4" />
        </button>
        <Modal toggleModal={toggleModal} ref={modal}>
          {modalContent}
        </Modal>
      </div>
    </li>
  );
};

export default Sample;
