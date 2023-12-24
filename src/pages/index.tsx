import RootLayout from '@/components/Layouts/RootLayout';
import { ReactNode } from 'react';
import CategoryCard from '@/components/Category/CategoryCard';
import Link from 'next/link';


export default function Home({categorieData}:any) {
  
  const categories=categorieData?.data;
  return (
    <div className='my-8'>
      <div className='my-8'>
      <h1 className='text-blue-500 text-center text-2xl font-semibold'>Popular Quiz Topics</h1>
      <div className='flex flex-row flex-wrap justify-center gap-8'>
        {
          categories?.map((category:any)=><CategoryCard key={category.id} category={category}/>)
        }
      </div>
      <div className='mt-8 text-center'>
          <Link href="/exam" className='text-bold px-2 py-2 rounded-lg bg-blue-500 text-white '>See All Topics</Link>
          </div>
      </div>
    </div>
  )
}

Home.getLayout = function getLayout(page:ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};


export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/api/v1/categories");
  const data = await res.json();

  return {
    props: {
      categorieData: data,
    },
    revalidate: 300,
  };
}; 
