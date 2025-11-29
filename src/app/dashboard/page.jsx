import DashboardSearchBar from "@/components/page-layout/dashboard-page/DashboardSearchBar";

const page = async ({ searchParams }) => {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/clicked_user_data`
  );
  const data = await response.json();
  const query = await searchParams;
  const company = query?.company?.trim().replace(/\s+/g, "") || "all";
  return (
    <div className="w-full lg:w-4/5 mx-auto">
      <p className="font-bold text-3xl text-center my-5">Clicked Data</p>
      <p>{company}</p>
      {/* search bar  */}
      <DashboardSearchBar></DashboardSearchBar>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">Serial No</th>
              <th>Name</th>
              <th>Company</th>
              <th>Device</th>
              <th className="text-center">IP</th>
              <th>Country</th>
              <th>Time Zone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product_info, index) => {
              return (
                <tr key={index}>
                  <th className="text-center">{index + 1}</th>
                  <td>{product_info.product_name}</td>
                  <td>{product_info.company}</td>
                  <td>{product_info.device}</td>
                  <td className="text-center">{product_info.geo.ip}</td>
                  <td>{product_info.geo.country}</td>
                  <td>{product_info.geo.timezone}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
