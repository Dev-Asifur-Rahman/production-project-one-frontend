"use client";

const RedirectButton = () => {
  const handleDirect = async (e) => {
    const res = await fetch("https://dealbondhu.vercel.app/post_track_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: "Bag",
        product_link:
          "https://slickdeals.net/f/18786394-the-north-face-men-s-vault-backpack-clay-gray-new-taupe-green-39-macy-s?src=frontpage&attrsrc=Frontpage%3AType%3AMissed",
        company: "slickdeals",
      }),
    });

    const result = await res.json();
    if (result.acknowledged === true) {
      window.open(
        "https://slickdeals.net/f/18786394-the-north-face-men-s-vault-backpack-clay-gray-new-taupe-green-39-macy-s?src=frontpage&attrsrc=Frontpage%3AType%3AMissed",
        "blank"
      );
    }

    else {
        return alert('internal error ! Try Again')
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
      Get deal at SlickDeals
    </button>
  );
};

export default RedirectButton;
