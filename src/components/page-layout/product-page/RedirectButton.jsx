"use client";

const RedirectButton = ({ product_link, title, company }) => {
  const handleDirect = async (e) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/post_track_info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: title,
        product_link: product_link,

        company,
      }),
    });

    const result = await res.json();
    if (result.acknowledged === true) {
      window.open(product_link, "blank");
    } else {
      return alert("internal error ! Try Again");
    }
  };
  return (
    <button
      onClick={handleDirect}
      style={{
        background: `linear-gradient(21deg,rgba(123, 97, 207, 1) 0%, rgba(89, 101, 194, 1) 34%, rgba(86, 127, 196, 1) 59%, rgba(102, 158, 222, 1) 71%, rgba(255, 255, 255, 1) 98%)`,
      }}
      className="btn rounded-xl hover:bg-blue-800 text-white"
    >
      Get deal at {company}
    </button>
  );
};

export default RedirectButton;
