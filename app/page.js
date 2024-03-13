"use client";

import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";

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
     <head>
   <title>page app</title>
        <meta
          name="description"
          content={`test description`}
        />
        <meta property="og:image" content="https://ttimages.blob.core.windows.net/property/21e11ce8-e391-4aa5-b872-c94cfbbe45f1.jpg" />
        </head>
    test
    </>
  );
}

export default Page;
