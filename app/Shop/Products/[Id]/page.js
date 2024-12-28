'use client'
import ProductDetail from '@/app/Components/ProductDetail/ProductDetail';
import { useParams } from 'next/navigation'
import React, { Suspense } from 'react'

const page = () => {
  const id = useParams();
  const p_id = id.Id;
  console.log(p_id);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductDetail id={p_id} />
      </Suspense>
    </div>
  )
}

export default page
