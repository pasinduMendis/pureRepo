"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";

function Page() {
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(true);

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
      {/* <head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="noindex" />
        <meta property="og:image" content={metaImage} />
      </head> */}
      {loading ? (
        <div>Loading...</div>
      ) :  (
        <>{<App />}</>
      )}
    </>
  );
}

export default Page;
