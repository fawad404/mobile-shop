'use client'
import ProductDetail from '@/app/Components/ProductDetail/ProductDetail';
import { useParams } from 'next/navigation'
import React, { Suspense, useState, useEffect } from 'react';

const Page = () => {
  const id = useParams();
  const p_id = id.Id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://phone-cloud-plus-backend.vercel.app/api/v1/products/${p_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!data.getSpecificProduct) {
          throw new Error('Invalid data received');
        }
        setProduct(data.getSpecificProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (p_id) {
      fetchProduct();
    }
  }, [p_id]);

  useEffect(() => {

    if (product) {
      document.title = product.title;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', product.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = product.description;
        document.head.appendChild(meta);
      }
    }
  }, [product]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error || !product) {
    return <div>Error: {error || 'Product not found'}</div>;
  }

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail id={p_id} product={product} />
      </Suspense>
    </div>
  )
}

export default Page
