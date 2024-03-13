"use client";

import "regenerator-runtime/runtime";
import LoginWrapper from "../../components/AppRe";
import React, { useEffect, useState } from "react";
import App from "../../components/App";

function Page() {
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(true);
  //get the pathname from the URL
  useEffect(() => {
    if (window !== undefined) {
      const pathname = window.location.pathname;
      setLoading(false);
      setPathname(pathname);
    } else {
      setLoading(true);
    }
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>{pathname === "/" ? <LoginWrapper /> : <App />}</>
      )}
    </>
  );
}

export default Page;
