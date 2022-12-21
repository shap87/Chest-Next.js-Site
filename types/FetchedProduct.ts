interface FetchedProduct {
  brand: string;
  description: string | null;
  image: string | null;
  price: number | null;
  title: string | null;
  priceCurrency: string | null;
  url: string;
}

export default FetchedProduct;
