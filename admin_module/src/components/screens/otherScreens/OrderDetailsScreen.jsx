import React, { useEffect, useState } from "react";
import { firestore } from "../../../../FirebaseConfig/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import "./otherCss/OrderDetailsScreen.css";

const OrderDetailsScreen = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderDoc = await getDoc(doc(firestore, "orders", id));
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching order details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (
    <section id="order-details">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2 className="order-details-title">Order Details</h2>
          </div>
        </div>

        {loading ? (
          <div className="loader-container">
            <TailSpin height={30} width={30} color="#56c777" />
          </div>
        ) : order ? (
          <div className="row order-details-row">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <img
                src={order.product_pic}
                alt="Product"
                className="product-img img-fluid"
              />
            </div>

            <div className="col-sm-12 col-md-6 col-lg-8">
              <table className="orders-table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{order.name}</td>
                    <th>Cell</th>
                    <td>{order.cell}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{order.address}</td>
                  </tr>

                  {/* Fields specific to Gents */}
                  {order.category === "gents" ? (
                    <>
                      <tr>
                        <th>Neck</th>
                        <td>{order.neck}</td>
                      </tr>
                      <tr>
                        <th>Pocket</th>
                        <td>{order.pocket}</td>
                      </tr>
                      <tr>
                        <th>Daman</th>
                        <td>{order.daman}</td>
                      </tr>
                      <tr>
                        <th>Wrist</th>
                        <td>{order.wrist}</td>
                      </tr>
                      <tr>
                        <th>Puncha</th>
                        <td>{order.puncha}</td>
                      </tr>
                      <tr>
                        <th>Top Stitch</th>
                        <td>{order.Top_double_stitch}</td>
                      </tr>
                      <tr>
                        <th>Embroidery</th>
                        <td>{order.embroidery}</td>
                      </tr>
                    </>
                  ) : order.category === "ladies" ? (
                    <>
                      <tr>
                        <th>Piko</th>
                        <td>{order.piko}</td>
                      </tr>
                      <tr>
                        <th>Pocket</th>
                        <td>{order.dupatta}</td>
                      </tr>
                      <tr>
                        <th>Top</th>
                        <td>{order.top}</td>
                      </tr>
                      <tr>
                        <th>Embroidery</th>
                        <td>{order.embroidery}</td>
                      </tr>
                    </>
                  ) : null}

                  <tr>
                    <th>Available Time</th>
                    <td>{order.availTime}</td>
                    <th>Price</th>
                    <td>Rs.{order.price}-/</td>
                  </tr>
                  <tr>
                    <th>Delivery Charges</th>
                    <td>Rs.{order.deliveryCharges}-/</td>
                    <th>Total Price</th>
                    <td>Rs.{order.total}-/</td>
                  </tr>
                  <tr>
                    <th>Sample</th>
                    <td>
                      <img
                        src={order.sample}
                        alt="Sample"
                        className="sample-img"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="no-details-container">
            <p className="no-details">No Order Details Available!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderDetailsScreen;
