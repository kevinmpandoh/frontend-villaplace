import DetailVilla from "@/components/DetailVilla/DetailVilla";
import { cookies } from "next/headers";

const DetailVillaPage = async ({ params }: { params: { villaId: string } }) => {
  const { villaId } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.getAll();

  return (
    <>
      <div className=" bg-gray-100 py-4">
        <DetailVilla villaId={villaId} token={token} />
      </div>
    </>
  );
};

export default DetailVillaPage;
