import Image from 'next/image'
import RootLayout from '@/components/Layouts/RootLayout';
import { ReactNode } from 'react';


export default function Home() {
  return (
    <div>
      <h1>Hello Home</h1>
    </div>
  )
}

Home.getLayout = function getLayout(page:ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};

