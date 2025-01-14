import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrdersPage.css";
import Navigation from "./Navigation";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("Svi");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  const itemsPerPage = 10; // Broj porudžbina po stranici

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/porudzbine", {
        params: {
          page: pagination.currentPage,
          per_page: itemsPerPage,
          status:
            statusFilter === "Svi"
              ? null
              : statusFilter === "Na čekanju"
              ? "Primljena"
              : "Kompletirana",
        },
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
        },
      });

      setOrders(response.data.data);

      setPagination({
        currentPage: response.data.meta.current_page,
        totalPages: response.data.meta.last_page,
        totalItems: response.data.meta.total,
      });
    } catch (error) {
      console.error("Greška prilikom učitavanja porudžbina:", error);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8000/api/porudzbine/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
          },
        }
      );
      fetchOrders(); // Ponovno učitavanje porudžbina
    } catch (error) {
      console.error("Greška prilikom ažuriranja statusa:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage, statusFilter]);

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  return (
    <div>
      <Navigation />
      <div className="orders-page">
        <h2 className="page-title">Pregled porudžbina</h2>

        {/* Filter */}
        <div className="filter-container">
          <label htmlFor="statusFilter">Filter po statusu:</label>
          <select
            id="statusFilter"
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Svi">Svi</option>
            <option value="Na čekanju">Na čekanju</option>
            <option value="Izvršena">Izvršena</option>
          </select>
        </div>

        {/* Tabela sa porudžbinama */}
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Korisnik</th>
              <th>Stavke</th>
              <th>Ukupna cena</th>
              <th>Status</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`order-row ${
                    order.status === "Kompletirana"
                      ? "completed-order"
                      : "pending-order"
                  }`}
                >
                  <td>{(pagination.currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{order.korisnik.username}</td>
                  <td>
                    <ul>
                      {order.stavke.map((stavka, i) => (
                        <li key={i}>
                          {stavka.proizvod.naziv} x{stavka.kolicina} -{" "}
                          {stavka.cena}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.ukupna_cena}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          order.id,
                          order.status === "Primljena"
                            ? "Kompletirana"
                            : "Primljena"
                        )
                      }
                    >
                      {order.status === "Primljena"
                        ? "Kompletiraj"
                        : "Vrati na primljenu"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Nema porudžbina za prikaz.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Paginacija */}
        <div className="pagination">
          <button
            onClick={handlePrevPage}
            disabled={pagination.currentPage === 1}
            className="pagination-button"
          >
            Prethodna
          </button>
          <span className="pagination-info">
            Stranica {pagination.currentPage} od {pagination.totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pagination.currentPage === pagination.totalPages}
            className="pagination-button"
          >
            Sledeća
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
