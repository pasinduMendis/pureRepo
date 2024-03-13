"use client";

import "regenerator-runtime/runtime";
import LoginWrapper from "../components/AppRe";
import React, { useEffect, useState } from "react";

function Page() {
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(true);
  //get the pathname from the URL
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (window !== undefined) {
      const pathname = window.location.pathname;
      setLoading(false);
      setPathname(pathname);
    } else {
      setLoading(true);
    }
  }, []);

  return <>{loading ? <div>Loading...</div> : <>{<LoginWrapper />}</>}</>;
}

export default Page;
