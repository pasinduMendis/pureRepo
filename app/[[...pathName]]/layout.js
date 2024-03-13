/* eslint-disable @next/next/no-sync-scripts */
import "regenerator-runtime/runtime";
import "../globals.css";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../constants";

export async function generateMetadata(props) {
  // read route params
  console.log("prop : ", props.path1);

  // // fetch data
  const response = await axios.get(REACT_APP_BASE_URL + "getOne/258410", {
    headers: { "content-type": "application/json" },
  });

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `test ${response.data.title} ${response.data.city} ${response.data.state} ${response.data.zip}`,
    openGraph: {
      images: [
        response.data.photos[0] ??
          "https://ttimages.blob.core.windows.net/property/ff824ac6-4e3d-40c4-8c6f-f96536d0f59f.jpg",
      ],
    },
  };
}

export default function RootLayout({ children }, props) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <link
          rel="icon"
          href="https://assets-global.website-files.com/61fa83b79c8c75df109fe1fc/61fa888c5c2c6970eb630744_favicon.ico"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta NAME="robots" CONTENT="noindex" />
        <link rel="stylesheet" href="https://use.typekit.net/eke1rvr.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://code.jquery.com/jquery-3.6.2.min.js"
          integrity="sha256-2krYZKh//PcchRtd+H+VyyQoZ/e3EcrkxhM8ycwASPA="
          crossOrigin="anonymous"
        />
        {/* <title>PURE Listings</title> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
