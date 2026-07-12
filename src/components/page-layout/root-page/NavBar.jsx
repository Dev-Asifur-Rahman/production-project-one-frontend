"use client";
import { BsSearch } from "react-icons/bs";
// import { PiBellSimpleRingingThin } from "react-icons/pi";
// import { BsPhone } from "react-icons/bs";
import BrandName from "@/components/global-layout-components/BrandName";
import PostDeal from "@/components/sub-components/navbar/PostDeal";
import { usePathname, useRouter } from "next/navigation";
import Sign from "@/components/sub-components/navbar/Sign";
import MenuDrawerSmall from "@/components/sub-components/navbar/MenuDrawerSmall";
import SavedItems from "@/components/sub-components/navbar/SavedItems";
import ToggleLanguage from "@/components/sub-components/navbar/ToggleLanguage";
import { useContext, useRef, useState } from "react";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import ToggleLanguageIcon from "@/components/sub-components/navbar/ToggleLanguageIcon";

const NavBar = () => {
  const pathname = usePathname();
  const { lan } = useContext(LanguageContext);
  const router = useRouter();

  const [suggestions, setSuggestions] = useState([]);
  const debounceRef = useRef(null);

  const searchProduct = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value.trim();
      if (!value) return;
      setSuggestions([]);
      router.push(`/search/${encodeURIComponent(value)}`);
    }
  };

  const handleSuggestion = async (e) => {
    const value = e.target.value.trim();

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (!value) {
        setSuggestions([]);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/search_by_keyword/${encodeURIComponent(value)}`,
      );

      const result = await res.json();
      setSuggestions(result);
    }, 300);
  };

  const handleNavigateSuggestedProduct = (id) => {
    setSuggestions([]);
    router.push(`/product/${id}`);
  };

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/reset_password") ||
    pathname.startsWith("/verify_reset_code") ||
    pathname.startsWith("/reset_new_password")
  ) {
    return;
  } else {
    return (
      <>
        <section className="w-full px-3 smd:py-6 py-4 lg:py-7 flex justify-between bg-[#006A4E] items-center">
          {/* logo section */}
          <BrandName></BrandName>
          {/* <ToggleLanguage></ToggleLanguage> */}
          <ToggleLanguageIcon></ToggleLanguageIcon>
          {/* search bar  */}
          <div className=" inline-flex relative w-3/6 h-8 mmd:h-9 md:h-10">
            <input
              onKeyDown={searchProduct}
              onChange={handleSuggestion}
              type="text"
              placeholder={translation[lan].navbar.searchBar}
              className="input w-full h-full rounded-2xl smd:rounded-4xl bg-transparent border-white text-white focus:outline-none focus:ring-0 lg:pl-6 mmd:pl-3 md:pl-4 pl-2"
            />
            <BsSearch
              id="navbar-search-icon"
              className="absolute cursor-pointer text-white smd:w-6 w-4  smd:h-6 h-4 top-1/2 right-[4%] mmd:right-[2%] -translate-y-1/2"
            />
            {suggestions.length !== 0 && (
              <ul className="absolute z-[200] mt-1 top-full menu bg-base-200 rounded-box w-full">
                {suggestions.map((suggestion, index) => {
                  return (
                    <li key={index} className="w-full">
                      <a
                        onClick={() =>
                          handleNavigateSuggestedProduct(suggestion?._id)
                        }
                        className="block truncate w-full"
                      >
                        {suggestion.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* <ul className="absolute top-full w-full z-[200] menu bg-base-200 rounded-box border">
              <li className="w-full p-1.5">
                <a>Hi</a>
              </li>
              <li className="w-full p-1.5">
                <a>Hello</a>
              </li>
            </ul> */}
          </div>

          {/* options */}
          <div
            id="navbar-icon-div"
            className="hidden mmd:inline-flex lg:flex mmd:justify-evenly mmd:gap-2 md:gap-0 items-center mmd:w-1/5"
          >
            <SavedItems></SavedItems>
            <PostDeal></PostDeal>
            <Sign></Sign>
          </div>

          {/* menu for small screen  */}
          <div className="mmd:hidden">
            <div className="w-6 aspect-square flex justify-center items-center">
              <MenuDrawerSmall></MenuDrawerSmall>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default NavBar;
