import { useRouter } from "next/navigation";

// Custom hook to access query parameters
export default function useQueryParams() {
  const router = useRouter();

  console.log("router", router);

  // Return the query parameters
  return router;
}
