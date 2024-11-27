import Booking from "@/components/Booking/Booking";

export const metadata = {
  title: "Pesanan | Villaplace",
};

const Order = () => {
  return (
    <>
      <div className=" p-2 border-b-2 border-gray-200 mb-5">
        <h1 className="text-lg font-bold">Pesanan saya</h1>
      </div>

      <Booking />
    </>
  );
};

export default Order;
