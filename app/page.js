"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const rouute = useRouter();
  //get the pathname from the URL
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    rouute.push("/searching");
  }, []);

  return <></>;
}

export default Page;
