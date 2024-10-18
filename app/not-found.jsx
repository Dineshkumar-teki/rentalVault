import React from "react";
import notFound from "@/assests/styles/images/notFound.png";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center min-h-[90vh]">
      <Image src={notFound} alt="Not-Found" widht={400} className="object-cover" />
      <h2 className="font-semibold text-xl mb-3 " >The page you are looking for dosn't exist</h2>
      <Link href="/" className="bg-black text-white rounded-md py-3 px-6 hover:bg-slate-700">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFound;
