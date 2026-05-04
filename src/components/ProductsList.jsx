import { useEffect, useState } from "react";
import axiosInstance from "../apis/Config";
import ProductCart from "./ProductCart";
import "../Style/ProductsList.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

function ProductsList() {
  const { lang } = useContext(LanguageContext);
  const PRODUCTS_PER_PAGE = 12;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;

    setIsLoading(true);
    console.log("Fetching products from API..."); // Debug log
    axiosInstance
      .get(`/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`)
      .then((res) => {
        console.log("Products loaded successfully:", res.data); // Debug log
        setProducts(res.data.products);
        setTotalProducts(res.data.total);
      })
      .catch((err) => {
        console.error("Error fetching products:", err.message, err.response); // Better error logging
      })
      .finally(() => setIsLoading(false));
  }, [currentPage]);

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let page = 1; page <= totalPages; page += 1) {
      items.push(
        <li
          key={page}
          className={`page-item ${page === currentPage ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => handlePageChange(page)}>
            {page}
          </button>
        </li>,
      );
    }
    return items;
  };

  return (
    <div className="container my-5 text-center">
      {isLoading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 mt-3">
        {products?.map((product) => (
          <div className="col" key={product.id}>
            <ProductCart product={product} />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Products pagination" className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {lang === "ar" ? "السابق" : "Previous"}
              </button>
            </li>

            {renderPaginationItems()}

            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {lang === "ar" ? "التالي" : "Next"}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default ProductsList;
