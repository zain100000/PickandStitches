import React, { useEffect, useState } from "react";
import { firestore, storage } from "../../../../FirebaseConfig/FirebaseConfig";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./otherCss/GetProducts.css";
import { TailSpin } from "react-loader-spinner";
import CustomModal from "../../utils/CustomModal";
import deleteAnimation from "../../../assets/animations/delete.json";
import editAnimation from "../../../assets/animations/edit.json";
import { toast } from "react-toastify";

const GetProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, "products");
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(firestore, "products", id));
      toast.success("Product Deleted Successfully!");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product: ", error);
      toast.error("Error deleting product!");
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
      setProductToDelete(null);
    }
  };

  const handleUpdateProduct = async () => {
    setIsEditing(true);

    try {
      let updatedImageURL = productImage;

      if (imageFile) {
        const imageRef = ref(storage, `products/${currentProduct.id}`);
        await uploadBytes(imageRef, imageFile);
        updatedImageURL = await getDownloadURL(imageRef);
      }

      const productRef = doc(firestore, "products", currentProduct.id);
      await updateDoc(productRef, {
        product: productName,
        price: productPrice,
        category: productCategory,
        image: updatedImageURL,
      });

      toast.success("Product Updated Successfully!");
      setProducts(
        products.map((product) =>
          product.id === currentProduct.id
            ? {
                ...product,
                product: productName,
                price: productPrice,
                category: productCategory,
                image: updatedImageURL,
              }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating product: ", error);
      toast.error("Error updating product!");
    } finally {
      setIsEditing(false);
      setEditModalVisible(false);
      setCurrentProduct(null);
      setImageFile(null);
    }
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalVisible(true);
  };

  const openEditModal = (product) => {
    setCurrentProduct(product);
    setProductName(product.product);
    setProductPrice(product.price);
    setProductCategory(product.category);
    setProductImage(product.image);
    setEditModalVisible(true);
  };

  return (
    <section id="get-products">
      <div className="products-container">
        {loading ? (
          <div className="loader-container">
            <TailSpin height={30} width={30} color="#56c777" />
          </div>
        ) : products.length > 0 ? (
          <table className="products-table">
            <thead>
              <tr>
                <th>Pic</th>
                <th>Product</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.product}
                      className="product-image"
                    />
                  </td>
                  <td>{product.product}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>
                    <button
                      className="action-btn edit-btn"
                      onClick={() => openEditModal(product)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => openDeleteModal(product)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-products-container">
            <p className="no-products">No Products Available!</p>
          </div>
        )}
      </div>

      <CustomModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this product?"
        animationSource={deleteAnimation}
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
          if (productToDelete) {
            handleDeleteProduct(productToDelete.id);
          }
        }}
      />

      <CustomModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        title="Edit Product"
        description={
          <>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Enter product price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group mb-3">
              <select
                className="form-select form-control"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="gents">Gents</option>
                <option value="ladies">Ladies</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
          </>
        }
        animationSource={editAnimation}
        primaryButtonText="Cancel"
        onPrimaryButtonPress={() => setEditModalVisible(false)}
        secondaryButtonText={
          isEditing ? (
            <TailSpin height={20} width={20} color="#fff" />
          ) : (
            "Update"
          )
        }
        onSecondaryButtonPress={handleUpdateProduct}
      />
    </section>
  );
};

export default GetProducts;
