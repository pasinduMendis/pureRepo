/* eslint-disable @next/next/no-sync-scripts */
import "regenerator-runtime/runtime";
import "../../globals.css";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../../constants";

export async function generateMetadata(pathname) {
  // read route params
  console.log("prop : ", pathname);

  // // fetch data
  const { data, error } = await axios.get(
    REACT_APP_BASE_URL + "getOne/" + pathname.params.path,
    {
      headers: { "content-type": "application/json" },
    }
  );

  console.log("apiData", data);

  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${data?.address} ${data?.city} ${data?.state} ${data?.zip}`,
    description:`${data?.beds} br | ${data?.baths} ba | ${data?.squareFootage} sqft`,
    openGraph: {

      images: [
        data?.photos[0] ??
          "https://ttimages.blob.core.windows.net/property/ff824ac6-4e3d-40c4-8c6f-f96536d0f59f.jpg",
      ],
    },
  };
}

export default function RootLayout({ children }, props) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://assets-global.website-files.com/61fa83b79c8c75df109fe1fc/61fa888c5c2c6970eb630744_favicon.ico"
        />

        <link rel="stylesheet" href="https://use.typekit.net/eke1rvr.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* <title>PURE Listings</title> */}
      </head>
      <body>{children}</body>
    </html>
  );
}
