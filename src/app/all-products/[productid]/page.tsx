import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import { Product } from "@/types/types";
import { singleProduct } from "@/app/api/axios";
import { notFound } from "next/navigation";

type ProductParams = Promise<{
  productid: string;
}>;
const Page = async (props: { params: ProductParams }) => {
  let data: Product | null = null;
  const params = await props.params;
  const productid = params.productid;

  if (!productid || isNaN(parseInt(productid))) {
    return notFound();
  }

  const userId: number = parseInt(productid); // Convert to number
  try {
    const res = await singleProduct(userId);
    console.log(res.data, "Fetched Products");
    data = res.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    return null;
  }

  return (
    <div className="px-[120px]">
      <div className="bg-slate-100 rounded-xl flex flex-col items-center mt-[20px] ">
        <Image
          src={data?.thumbnail as string}
          alt="img"
          width={200}
          height={200}
          className="mb-2 rounded"
        />
        <hr className="w-full" />

        <p className="text-center">{data?.title}</p>
        <hr className="w-full" />

        <p className="w-[400px] text-left">{data?.description}</p>
        <hr className="w-full mb-[20px]" />
        <div className="flex gap-[30px] capitalize">
          <p>category: {data?.category}</p>
          <p>Price: ${data?.price.toFixed(2)}</p>
          <p>rating: {data?.rating}</p>
        </div>

        <AddToCart id={userId} />
      </div>
    </div>
  );
};

export default Page;
