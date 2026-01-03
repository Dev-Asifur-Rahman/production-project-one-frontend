const imageUpload = async (url) => {
  const formData = new FormData();
  formData.append("image", url);
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data;
};

export default imageUpload;