import  getUserOrders  from "@/CartActions/getUserOrders.action";
import { UserOrder } from "@/types/userOrder";
import Image from "next/image";

export default async function OrdersPage() {
  try {
    const orders: UserOrder[] = await getUserOrders();

    if (!orders || orders.length === 0) {
      return (
        <div className="container mx-auto p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">My Orders</h1>
          <p>No orders found.</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-6">My Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg shadow-md p-4 bg-white">
              <h2 className="font-bold text-lg mb-2">Order #{order.id}</h2>
              <p><span className="font-semibold">Total Price:</span> {order.totalOrderPrice} EGP</p>
              <p><span className="font-semibold">Payment Method:</span> {order.paymentMethodType}</p>
              <p><span className="font-semibold">Paid:</span> {order.isPaid ? "✅" : "❌"}</p>
              <p><span className="font-semibold">Delivered:</span> {order.isDelivered ? "🚚" : "⌛"}</p>

              <div className="mt-3">
                <h3 className="font-semibold mb-2">Items:</h3>
                {order.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-3 mb-2">
                    <Image
                    width={100}
                    height={100}
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.product.title}</p>
                      <p className="text-sm text-gray-600">
                        {item.count} × {item.price} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500 mt-2"> <span className="mx-1">Ordered on</span>
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }catch (error: unknown) {
  const message =
    error instanceof Error ? error.message : "Something went wrong";

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <p className="text-red-600">{message}</p>
    </div>
  );
}

}
