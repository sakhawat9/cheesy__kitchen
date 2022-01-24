import Title from "components/common/Title";
import React from "react";

const ViewAllOrder = ({ orderFood }) => {
  return (
    <div>
      <Title title="All Order" subtitle="" description="" />
      <table className="table-auto">
        <thead className="text-white border-gray-300 bg-amazon-500">
          <tr>
            <th className="px-4 py-4">User name</th>
            <th className="px-4 py-4">Food name</th>
            <th className="px-4 py-4">Price</th>
            <th className="px-4 py-4">Payment with</th>
            <th className="px-4 py-4">Phone</th>
            <th className="px-4 py-4">Billing address</th>
            <th className="px-4 py-4">Card last digit</th>
          </tr>
        </thead>
        <tbody className="">
          {orderFood.map((data) => (
            <tr className="bg-gray-200 border-2 border-gray-300">
              <td className="px-4 py-2">{data.userInfo.name}</td>
              <td className="px-4 py-2">{data.cartItems[0]?.name}</td>
              <td className="px-4 py-2">{data.cartItems[0]?.price}</td>
              <td className="px-4 py-2 uppercase">{data.paymentInfo.brand}</td>
              <td className="px-4 py-2">{data.phone}</td>
              <td className="px-4 py-2">{data.address}</td>

              <td className="px-4 py-2">{data.paymentInfo.last4}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllOrder;
