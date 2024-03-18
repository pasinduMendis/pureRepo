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
      <section>{children}</section>
  );
}
