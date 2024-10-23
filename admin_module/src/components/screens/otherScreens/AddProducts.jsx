import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { storage, firestore } from "../../../../FirebaseConfig/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import "./otherCss/AddProducts.css";

const AddProducts = () => {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddProducts = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!image) return;

      const imageName = `products/${Date.now()}_${image.name}`;
      const imageRef = ref(storage, imageName);

      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const productData = {
        product,
        price,
        category,
        image: imageUrl,
        createdAt: Date.now(),
      };

      const response = await addDoc(
        collection(firestore, "products"),
        productData
      );

      if (response) {
        toast.success("Product added successfully");
        setProduct("");
        setPrice("");
        setCategory("");
        setImage("");
      }
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("Error adding product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="add-products">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-6">
            <div className="add-products-wrap p-4 p-md-5">
              <form onSubmit={handleAddProducts} className="add-products-form">
                <div className="form-group mb-3">
                  <label className="label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter product name"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label className="label">Category</label>
                  <select
                    className="form-select form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="gents">Gents</option>
                    <option value="ladies">Ladies</option>
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label className="label">Product Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary rounded submit px-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="loader-container">
                        <TailSpin height={20} width={20} color="#fff" />
                      </div>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProducts;
