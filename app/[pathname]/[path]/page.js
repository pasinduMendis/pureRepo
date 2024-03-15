"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";

function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window !== undefined) {

      setLoading(false);
    } else {
      setLoading(true);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) :  (
        <>{<App />}</>
      )}
    </>
  );
}

export default Page;
