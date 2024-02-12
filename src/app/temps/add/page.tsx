"use client";
import { useRouter } from "next/navigation";
import TempForm from "~/app/_components/tempForm";
import { api } from "~/trpc/react";

const AddPage = () => {
  const router = useRouter();
  const { mutate, isLoading } = api.temp.create.useMutation({onSuccess: () => router.push('/')});
  return (
    <div>
      <TempForm onSubmit={mutate} disabled={isLoading} />
    </div>
  );
};

export default AddPage;
