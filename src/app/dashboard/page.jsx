import CalenderSearch from "@/components/page-layout/dashboard-page/CalenderSearch";
import DashboardSearchBar from "@/components/page-layout/dashboard-page/DashboardSearchBar";

const page = async ({ searchParams }) => {
  const query = await searchParams;

  const search =
    query?.search?.trim().replace(/\s+/g, "").toLowerCase() || "all";

  const date = query?.date;

  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/clicked_user_data?search=${search}`
  );
  const data = await response.json();

  return (
    <div className="w-full lg:w-4/5 mx-auto">
      <p className="font-bold text-3xl text-center my-5">Clicked Data</p>
      {/* search bar  */}
      <DashboardSearchBar></DashboardSearchBar>

      {/* date  */}
      <div className="relative z-50">
        <CalenderSearch></CalenderSearch>
      </div>

      {data?.length === 0 ? (
        <p className="text-center">No Results Found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th className="text-center">Serial No</th>
                <th>Name</th>
                <th className="text-center">Company</th>
                <th>Device</th>
                <th className="text-center">IP</th>
                <th className="text-center">Time</th>
                <th>Date</th>
                <th>Country</th>
                <th>Time Zone</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product_info, index) => {
                return (
                  <tr key={index}>
                    <th className="text-center">{index + 1}</th>
                    <td className="">{product_info.product_name}</td>
                    <td className="text-center">{product_info.company}</td>
                    <td>{product_info.device}</td>
                    <td className="text-center">{product_info.geo.ip}</td>
                    <td className="text-center whitespace-nowrap">
                      {new Date(product_info?.date).toLocaleTimeString()}
                    </td>
                    <td className="text-center">
                      {new Date(product_info?.date).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap">
                      {product_info.geo.country}
                    </td>
                    <td>{product_info.geo.timezone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default page;
