import React, { useState } from "react";
import "./OrdersPage.css";
import Navigation from "./Navigation";

const OrdersPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Milan Jovanović",
      items: [
        { name: "Duks", quantity: 2, price: 2500 },
        { name: "Jakna", quantity: 1, price: 7000 },
      ],
      total: 12000,
      status: "Na čekanju",
    },
    {
      id: 2,
      customer: "Ana Petrović",
      items: [
        { name: "Majica", quantity: 3, price: 1500 },
        { name: "Pantalone", quantity: 1, price: 4000 },
      ],
      total: 8500,
      status: "Izvršena",
    },
  ]);

  const handleStatusChange = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? { ...order, status: order.status === "Na čekanju" ? "Izvršena" : "Na čekanju" }
          : order
      )
    );
  };

  return (
    <div>
        <Navigation/>
        <div className="orders-page">
        <h2 className="page-title">Pregled porudžbina</h2>
        <table className="orders-table">
            <thead>
            <tr>
                <th>#</th>
                <th>Korisnik</th>
                <th>Stavke</th>
                <th>Ukupna cena</th>
                <th>Status</th>
                <th>Akcija</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => (
                <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.customer}</td>
                <td>
                    <ul>
                    {order.items.map((item, i) => (
                        <li key={i}>
                        {item.name} x{item.quantity} - {item.price} RSD
                        </li>
                    ))}
                    </ul>
                </td>
                <td>{order.total} RSD</td>
                <td
                    className={`status ${order.status === "Izvršena" ? "completed" : "pending"}`}
                >
                    {order.status}
                </td>
                <td>
                    <button
                    className="status-btn"
                    onClick={() => handleStatusChange(order.id)}
                    >
                    {order.status === "Na čekanju" ? "Označi kao izvršena" : "Vrati na čekanje"}
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default OrdersPage;
