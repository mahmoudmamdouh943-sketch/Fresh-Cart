import Link from "next/link";


export default function Notfound() {
  return <>
 

      <div className=" my-50 flex flex-col items-center justify-center text-black">
  <h1 className="text-7xl font-bold animate-bounce mb-4">404</h1>
  <p className="text-xl mb-6">Looks like you are lost in space!</p>
  <Link  href="/" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full">Take me home</Link>
</div>
  
  </>
   
  
}
