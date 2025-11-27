"use client";

const Test = () => {
  const handleUser = async (e) => {
    fetch("https://dealbondhu-backend.vercel.app/track-user")
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <p onClick={handleUser} className="btn">
      track user
    </p>
  );
};

export default Test;
