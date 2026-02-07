"use client";
import { LanguageContext } from "@/context/GlobalLanguageProvider";
import translation from "@/utils/translation";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getCategory from "@/actions/category/getCategory";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/features/modalSlice";

const MenuDrawerSmall = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch()

  const toggleDrawer = () => setOpen((prev) => !prev);
  const closeDrawer = () => setOpen(false);

  const { lan, setLan } = useContext(LanguageContext);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategory();
      setCategories(data);
    };
    fetchCategory();
  }, []);

  const handleLanguage = async (language) => {
    setLan(language);
    document.documentElement.setAttribute("data-lang", language);
    localStorage.setItem("lang", language);
    const response = await fetch("/api/cookies/language", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lang: language }),
    });
    const lang = await response.json();
    closeDrawer();
    router.refresh();
  };

  const handleLogin = async () => {
    if (session.status === "unauthenticated") {
      closeDrawer();
      router.push("/auth/login");
    } else {
      await signOut({ redirect: false });
      closeDrawer();
      router.push("/");
    }
  };

  const handleSavedItems = () => {
    closeDrawer();
    router.push("/saved_products");
  };

  const handleCategoryNavigate = (category) => {
    closeDrawer()
    router.push(`/products/${encodeURIComponent(category)}`);
  };

  const handleModalOpen = () => {
    if (session.status === "unauthenticated" || session.status === "loading") {
      return toast.error("Sign In First");
    } else {
      closeDrawer()
      dispatch(openModal());
      return
    }
  };

  return (
    <div className="drawer drawer-end">
      <input
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={toggleDrawer}
      />

      <div className="drawer-content aspect-square">
        <label className="btn btn-circle swap swap-rotate bg-transparent border-none">
          <input type="checkbox" checked={open} onChange={toggleDrawer} />

          <svg
            className="swap-off fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-white"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      </div>

      {/* Drawer side */}
      <div className="drawer-side">
        <label className="drawer-overlay" onClick={closeDrawer}></label>

        <ul className="menu bg-base-100 min-h-full w-80 p-4">
          <li>
            <a onClick={handleModalOpen}>
              {translation[lan].navbar.menuDrawerSmall.headings.post_deal}
            </a>
          </li>
          {session?.data?.user && (
            <li>
              <a onClick={handleSavedItems}>
                {translation[lan].navbar.menuDrawerSmall.headings.saved_items}
              </a>
            </li>
          )}
          <li>
            <details>
              <summary>
                {translation[lan].navbar.menuDrawerSmall.headings.categories}
              </summary>
              <ul>
                {categories?.map((category, index) => {
                  return (
                    <li key={index}>
                      <a onClick={() => handleCategoryNavigate(category?.name)}>
                        {lan === "bn" ? category?.bn : category?.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>
                {translation[lan].navbar.menuDrawerSmall.headings.language}
              </summary>
              <ul>
                <li>
                  <a onClick={() => handleLanguage("en")}>
                    English {lan === "en" && `(active)`}
                  </a>
                </li>
                <li>
                  <a onClick={() => handleLanguage("bn")}>
                    বাংলা {lan === "bn" && `(active)`}
                  </a>
                </li>
              </ul>
            </details>
          </li>
          <li onClick={handleLogin}>
            <a>
              {
                (session.status = "unauthenticated"
                  ? translation[lan].navbar.menuDrawerSmall.headings.sign_out
                  : translation[lan].navbar.menuDrawerSmall.headings.sign_in)
              }
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuDrawerSmall;
