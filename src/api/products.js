export const getProducts = async (offset, limit) => {
  const url = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`;

  // Fetch total count
  const totalProductsRes = await fetch(
    "https://api.escuelajs.co/api/v1/products",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const totalData = await totalProductsRes.json();
  const totalItems = totalData.length;

  // Fetch paginated products and RETURN result
  const productsRes = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const productsData = await productsRes.json();

  console.log("Fetched Products --->", { products: productsData, totalItems });

  return {
    products: productsData || [],
    totalItems: totalItems || 0,
  };
};
