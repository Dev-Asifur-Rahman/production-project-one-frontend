const page = async ({ params }) => {
  const { id } = await params;
  console.log(id);
  return (
    <section className="w-full border ">
      {/* product details div  */}
      <div className="w-[96%] mx-auto flex flex-col smd:flex-row rounded-md shadow-md items-center smd:items-stretch">
        <div className="w-full smd:w-2/5 max-w-[270px] smd:max-w-none aspect-square border"></div>
        <div className="w-full smd:w-3/5 border">Hello</div>
      </div>

      {/* <img
            src="https://static.slickdealscdn.com/attachment/2/0/3/0/0/9/6/2/200x200/18682408.thumb"
            alt=""
            className="h-full w-full object-cover"
          /> */}

      {/* tab section  */}
      <section className="bg-[#FFFFFF] mt-0 m-4 mmd:p-4 border">
        <div className="tabs tabs-border">
          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Deal Details"
            defaultChecked
          />
          <div className="tab-content p-2">Tab content 1</div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Product Info"
          />
          <div className="tab-content   p-2">Tab content 2</div>

          <input
            type="radio"
            name="my_tabs_2"
            className="tab"
            aria-label="Community Notes"
          />
          <div className="tab-content  p-2">Tab content 3</div>
        </div>
      </section>
    </section>
  );
};

export default page;
