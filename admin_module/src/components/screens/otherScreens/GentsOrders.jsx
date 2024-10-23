import React, { useEffect, useState } from "react";
import { firestore } from "../../../../FirebaseConfig/FirebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import "./otherCss/GentsOrders.css";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import CustomModal from "../../utils/CustomModal";
import { useNavigate } from "react-router-dom";
import deleteAnimation from "../../../assets/animations/delete.json";

const GentsOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(firestore, "orders");
        const gentsQuery = query(
          ordersCollection,
          where("category", "==", "gents")
        );
        const ordersSnapshot = await getDocs(gentsQuery);
        const ordersList = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(firestore, "orders", id));
      toast.success("Order Deleted Successfully!");
      setOrders(orders.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Error deleting order: ", error);
      toast.error("Error deleting order!");
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
      setOrderToDelete(null);
    }
  };

  const openDeleteModal = (order) => {
    setOrderToDelete(order);
    setDeleteModalVisible(true);
  };

  const openViewModal = (order) => {
    if (order.id) {
      navigate(`/dashboard/order_details/${order.id}`);
    } else {
      console.error("Order ID is undefined");
    }
  };

  return (
    <section id="gents-orders">
      <div className="orders-container">
        {loading ? (
          <div className="loader-container">
            <TailSpin height={30} width={30} color="#56c777" />
          </div>
        ) : orders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Cell</th>
                <th>Address</th>
                <th>Product</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.name}</td>
                  <td>{order.cell}</td>
                  <td>{order.address}</td>
                  <td>{order.product}</td>
                  <td>{order.date}</td>
                  <td>{order.time}</td>
                  <td>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => openDeleteModal(order)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      className="action-btn view-btn"
                      onClick={() => openViewModal(order)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-orders-container">
            <p className="no-orders">No Gents Orders Available!</p>
          </div>
        )}
      </div>

      <CustomModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        animationSource={deleteAnimation}
        title="Confirm Deletion"
        description="Are you sure you want to delete this order?"
        primaryButtonText="Cancel"
        onPrimaryButtonPress={() => setDeleteModalVisible(false)}
        secondaryButtonText={
          isDeleting ? (
            <TailSpin height={20} width={20} color="#fff" />
          ) : (
            "Delete"
          )
        }
        onSecondaryButtonPress={() => {
          if (orderToDelete) {
            handleDelete(orderToDelete.id);
          }
        }}
      />
    </section>
  );
};

export default GentsOrders;
