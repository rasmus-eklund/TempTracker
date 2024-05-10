import React from "react";
import SampleForm from "./SampleForm";
import Icon from "~/icons/Icon";
import { createSample } from "~/server/api/temps";

const AddSample = () => {
  return (
    <div className="flex w-full cursor-pointer items-center gap-4 rounded-md bg-c2 p-1 hover:bg-c3">
      <SampleForm submit={createSample}>
        <Icon icon="plus" className="size-10 fill-c4" />
      </SampleForm>
      <span>Add measurement</span>
    </div>
  );
};

export default AddSample;
