"use client";

import imageUpload from "@/lib/imageUpload";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

const AllBanners = () => {
  const [banners, setBanners] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const bannerSpeedRef = useRef(0);

  useEffect(() => {
    const fetchBanners = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/banners`);
      const data = await res.json();
      setBanners(data);
    };
    fetchBanners();
  }, [refresh]);

  const handleBannerSpeed = async () => {
    const get_millisecond = bannerSpeedRef?.current.value;
    const trimmed = get_millisecond.trim("");
    if (!trimmed) {
      return toast.error("Enter Number");
    } else {
      const parsed = parseInt(trimmed);
      if (parsed < 1000) {
        return toast.error("value cant be less than 1000");
      } else if (parsed > 10000) {
        return toast.error("value cant be greater that 10000");
      } else {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/update_swiper_speed/6944135c03cea8c48c6d3abd`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ time: parsed }),
          }
        );
        const result = await res.json();
        if (result.acknowledged === true) {
          bannerSpeedRef.current.value = "";
          setRefresh(!refresh);
          return toast.success("Time Updated");
        }
      }
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete_banner/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.acknowledged === true) {
      toast.success("Banner Removed");
      setRefresh(!refresh);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const target = e.target;

    const company = target.company.value;
    const photoFile = target.banner_image.files[0];
    const image = await imageUpload(photoFile);
    if (image) {
      const object = {
        company: company,
        banner_link: image?.data.url,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload_banner`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      const result = await res.json();
      if (result.acknowledged === true) {
        toast.success("Banner Added");
        target.reset();
        setRefresh(!refresh);
        return;
      }
    }
  };

  const handleSort = async (id, sort) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/banner_sort?id=${id}&sort=${sort}`,
      {
        method: "PATCH",
      }
    );
    const result = await res.json();
    if (result?.acknowledged === true) {
      toast.success(`banner moved to ${sort}`);
      setRefresh(!refresh);
      return;
    } else {
      return toast.error(result.message);
    }
  };
  return (
    <div className="w-full">
      {banners?.length === 0 ? (
        <p className="text-2xl font-semibold text-center">
          No Banners Available
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th className="">Up</th>
                <th className="">Down</th>
                <th>Company</th>
                <th className="text-center">Delete</th>
                <th>Banner Link</th>
              </tr>
            </thead>
            <tbody>
              {banners?.map((banner, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td
                      onClick={() => handleSort(banner?._id, "up")}
                      className="text-center cursor-pointer"
                    >
                      <FaRegArrowAltCircleUp className="text-lg" />
                    </td>
                    <td
                      onClick={() => handleSort(banner?._id, "down")}
                      className="text-center "
                    >
                      <div className=" flex justify-center cursor-pointer">
                        <FaRegArrowAltCircleDown className="text-lg" />
                      </div>
                    </td>
                    <td>{banner?.company}</td>
                    <td>
                      <div
                        onClick={() => handleDelete(banner?._id)}
                        className="flex justify-center hover:cursor-pointer"
                      >
                        <GoTrash />
                      </div>
                    </td>
                    <td>
                      <div className="line-clamp-2">{banner?.banner_link}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-10">
        <p className=" text-xl">Upload New Banner</p>
        <form onSubmit={handleForm} className="flex flex-col gap-1 ">
          <label htmlFor="" className="label my-1">
            Company
          </label>
          <input
            type="text"
            className="input input-sm"
            name="company"
            required
          />
          <label htmlFor="" className="label my-1">
            Banner Image
          </label>
          <input
            required
            type="file"
            name="banner_image"
            className="file-input file-input-md"
          />
          <button className="btn btn-sm w-fit">Add New</button>
        </form>
      </div>

      <div className="flex flex-col gap-2 my-5">
        <label htmlFor="" className="label my-1">
          Control Banner Speed
        </label>
        <input
          ref={bannerSpeedRef}
          required
          type="number"
          placeholder="Insert as millisecond"
          className="input"
        />
        <button onClick={handleBannerSpeed} className="btn btn-sm w-fit">
          Add Speed
        </button>
      </div>
    </div>
  );
};

export default AllBanners;
