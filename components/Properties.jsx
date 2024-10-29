"use client";

import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [totalItems, setTotalItems] = useState(0);

  const handleChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch(
        `/api/properties?page=${page}&pageSize=${pageSize}`
      );
      try {
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          setProperties(data.properties);
          setTotalItems(data.total);
        } else {
          throw new Error("failed to fetch properties");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, pageSize]);
  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handleChange}
        />
      </div>
    </section>
  );
};

export default Properties;
