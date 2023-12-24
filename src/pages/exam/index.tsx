import CategoryCard from "@/components/Category/CategoryCard";
import RootLayout from "@/components/Layouts/RootLayout";
import { ReactNode } from "react";


const ExamPage = ({categorieData}:any) => {
    const categories=categorieData?.data;
    return (
        <div className='my-8'>
      <h1 className='text-blue-500 text-center text-2xl font-semibold'>Quiz Topics</h1>
      <div className='flex flex-row flex-wrap justify-center gap-8'>
        {
          categories?.map((category:any)=><CategoryCard key={category.id} category={category}/>)
        }
      </div>
      </div>
    );
};

export default ExamPage;

ExamPage.getLayout = function getLayout(page:ReactNode) {
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