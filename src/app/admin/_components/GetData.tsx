"use client";

import { useState } from "react";
import { generateJson } from "../backup";

const GetData = () => {
  const [json, setJson] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const data = await generateJson();
          setJson(data);
          setLoading(false);
        }}
      >
        {loading ? "Please wait" : "Backup from db"}
      </button>
      {json ? <p>{json}</p> : null}
    </div>
  );
};

export default GetData;
