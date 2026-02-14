import Link from "next/link";
import AllCategories from "@/api/AllCategories";
import Image from "next/image";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export default async function CategoriesPage() {
  const { data } = await AllCategories();
 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {data.map((cat : Category) => (
        <Link key={cat._id} href={`/category/${cat._id}`} className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
         
            <Image
            width={100}
            height={100}
              src={cat.image}
              alt={cat.name}
              className="w-32 h-32 object-cover rounded-md mb-2"
            />
            <h2 className="font-bold text-lg text-center">{cat.name}</h2>
        </Link>
      ))}
    </div>
  );
}
