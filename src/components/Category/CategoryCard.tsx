import Link from 'next/link';
import {FaCode} from 'react-icons/fa';

const CategoryCard = ({category}:any) => {
    return (
             <div className="w-full md:w-80 p-8 shadow-xl rounded-md">
                 <h4 className='text-lg font-semibold text-center'>Test Your Skill on</h4>
              <h3 className="text-xl font-bold text-center text-blue-500">
               {category.title}
          </h3>
          <FaCode className="text-7xl mx-auto" />
          
          <div className='mt-4 text-center'>
          <Link href={`/exam/${category.id}`} className='text-bold px-2 py-2 rounded-lg bg-blue-500 text-white '>Start Quiz</Link>
          </div>
          
        </div>
    );
};

export default CategoryCard;