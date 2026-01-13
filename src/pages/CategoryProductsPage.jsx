import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { Package } from "lucide-react";

const PAGE_SIZE = 10;

export default function CategoryProductsPage() {
  const { category } = useParams(); // 🔥 from URL
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategoryProducts = async (pageNumber = 1) => {
    setLoading(true);

    const res = await fetch(
      `http://127.0.0.1:8000/api/all-products/?category=${category}&page=${pageNumber}`
    );

    const data = await res.json();

    setProducts(data.results || []);
    setTotalPages(Math.ceil(data.count / PAGE_SIZE));
    setPage(pageNumber);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoryProducts(1);
  }, [category]);

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold capitalize">
          {category}
        </h1>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div key={product.id} className="border rounded-xl p-4">
                <img
                  src={product.images?.[0]?.image}
                  alt={product.name}
                  className="h-40 mx-auto object-contain"
                />
                <h3 className="font-bold mt-3 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-red-700 font-bold">
                  ₹{product.product_type?.[0]?.price}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              disabled={page === 1}
              onClick={() => fetchCategoryProducts(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => fetchCategoryProducts(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <Package size={48} className="mx-auto text-gray-300" />
          <p>No products found</p>
        </div>
      )}
    </div>
  );
}
