import SearchResult from "@/components/page-layout/search-product/SearchResult";
import { Suspense } from "react";

const page = async ({ params }) => {
  const { keyword } = await params;
  const decodedURI = decodeURIComponent(keyword);
  const res = await fetch(
    `${process.env.NEXT_BACKEND_URL}/search/${encodeURIComponent(decodedURI)}`,
  );
  const data = await res.json();
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full min-h-screen">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        }
      >
        <SearchResult products={data}></SearchResult>
      </Suspense>
    </div>
  );
};

export default page;
