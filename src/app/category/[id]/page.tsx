
import  getcategory  from '@/api/getCat';
import Image from 'next/image';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const res = await getcategory(id);
  

  const cat = res?.data;

  if (!cat) {
    return <p className="text-center mt-10">Category not found.</p>;
  }

  return (
    <div className="p-4 text-center my-20">
      <h1 className="text-2xl font-bold mb-4">{cat.name}</h1>
      <Image      src={cat.image}     alt={cat.name}    className="w-40 h-40 mx-auto object-contain mb-4"  />
    </div>
  );
}
