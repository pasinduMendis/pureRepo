"use client";

import "regenerator-runtime/runtime";
import LoginWrapper from "../../../components/AppRe";
import React, { useEffect, useState } from "react";
import App from "../../../components/App";

function Page() {
  const [pathname, setPathname] = useState("");
  const [loading, setLoading] = useState(true);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaImage, setMetaImage] = useState("");
  //get the pathname from the URL
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (window !== undefined) {
      const pathname = window.location.pathname;
      // if (
      //   window.location.search &&
      //   window.location.search.split("?locationID=").length == 2
      // ) {
      //   await axios
      //     .get(
      //       REACT_APP_BASE_URL +
      //         "/getOne/" +
      //         window.location.search.split("?locationID=")[1],
      //       {
      //         headers: { "content-type": "application/json" },
      //       }
      //     )
      //     .then((response) => {
      //       console.log("resData:", response.data);
      //       setMetaImage(response.data.photos[0]);
      //       setMetaDescription(
      //         `${response.data.beds} br | ${response.data.baths} ba ${response.data.squareFootage} sqft`
      //       );
      //       setMetaTitle(
      //         `${response.data.title} ${response.data.city} ${response.data.state} ${response.data.zip}`
      //       );
      //     });
      // } else {
      //   setMetaTitle(window.location.pathname);
      //   setMetaDescription(window.location.pathname);
      // }

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
      ) : pathname == "/" ? (
        <LoginWrapper />
      ) : (
        <>{<App />}</>
      )}
    </>
  );
}

export default Page;
