"use client";

import { ClipLoader } from "react-spinners";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

type Props = { toggleModal: () => void; id: string };

const RemoveModal = ({ id, toggleModal }: Props) => {
  const router = useRouter();
  const { mutate: remove, isLoading: removing } = api.temp.delete.useMutation({
    onSuccess: () => router.refresh(),
  });
  return (
    <div className="bg-3 flex flex-col items-center gap-5 p-5">
      <p>Remove measurement?</p>
      <div className="flex gap-5">
        {removing ? (
          <ClipLoader size={18} />
        ) : (
          <Button disabled={removing} onClick={() => remove({ id })}>
            Delete
          </Button>
        )}
        <Button onClick={toggleModal}>Cancel</Button>
      </div>
    </div>
  );
};

export default RemoveModal;
