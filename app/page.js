"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(true);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaImage, setMetaImage] = useState("");
  const rouute = useRouter();
  //get the pathname from the URL
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    rouute.push("/searching");
  }, []);

  return <>searching....</>;
}

export default Page;
