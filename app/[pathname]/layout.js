/* eslint-disable @next/next/no-sync-scripts */
import "regenerator-runtime/runtime";
import "../globals.css";

export async function generateMetadata(pathname) {

  return {
    title:pathname?.params?.pathname?? "PURE Listings",
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

        <title>PURE Listings</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
