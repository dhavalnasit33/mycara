import { fetchBrands, deleteBrand, bulkDeleteBrands } from "@/features/brands/brandsThunk";
import { GenericTable } from "@/components/ui/adminTable";
import { AppDispatch } from "@/store";
import {  useDispatch } from "react-redux";

export default function BrandsPage() {
  const dispatch =useDispatch<AppDispatch>();

  // ✅ Wrap thunks into functions returning Promises
  const fetchData = (params: any) => dispatch(fetchBrands(params)).unwrap();
  const handleDelete = (id: string) => dispatch(deleteBrand(id)).unwrap();
  const handleBulkDelete = (ids: string[]) => dispatch(bulkDeleteBrands(ids)).unwrap();

  return (
    <GenericTable
      title="Brands"
      fetchData={fetchData}
      deleteItem={handleDelete}
      bulkDeleteItems={handleBulkDelete}
      rowKey="_id"
      columns={[
        {
          key: "image_url",
          label: "Logo",
          render: (brand: any) =>
            brand.image_url ? (
              <img
                src={`${import.meta.env.VITE_API_URL_IMAGE}${brand.image_url}`}
                alt={brand.name}
                className="h-10 w-10 rounded-md object-cover border border-gray-200"
              />
            ) : (
              <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs border border-dashed border-gray-300">
                —
              </div>
            ),
        },
        { key: "name", label: "Name" },
        {
          key: "status",
          label: "Status",
          render: (brand: any) => (
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                brand.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {brand.status?.charAt(0).toUpperCase() + brand.status?.slice(1)}
            </span>
          ),
        },
      ]}
      filters={[
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ]}
    />
  );
}
