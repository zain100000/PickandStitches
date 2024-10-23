import React, { useEffect, useState } from "react";
import { firestore } from "../../../../FirebaseConfig/FirebaseConfig";
import { collection, getDocs, doc, deleteDoc, query } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import CustomModal from "../../utils/CustomModal";
import "./otherCss/Feedbacks.css";
import { useNavigate } from "react-router-dom";
import deleteAnimation from "../../../assets/animations/delete.json";

const FeedBacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackCollection = collection(firestore, "feed_backs");
        const feedbackQuery = query(feedbackCollection);
        const feedbacksSnapshot = await getDocs(feedbackQuery);
        const feedbacksList = feedbacksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(feedbacksList);
      } catch (error) {
        console.error("Error fetching Feedbacks: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deleteDoc(doc(firestore, "feed_backs", id));
      toast.success("FeedBack Deleted Successfully!");
      setFeedbackToDelete(feedbacks.filter((feedbacks) => feedbacks.id !== id));
    } catch (error) {
      console.error("Error deleting feedbacks: ", error);
      toast.error("Error deleting feedbacks!");
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
      setFeedbackToDelete(null);
    }
  };

  const openDeleteModal = (feedbacks) => {
    setFeedbackToDelete(feedbacks);
    setDeleteModalVisible(true);
  };

  return (
    <section id="get-feedbacks">
      <div className="feedbacks-container">
        {loading ? (
          <div className="loader-container">
            <TailSpin height={30} width={30} color="#56c777" />
          </div>
        ) : feedbacks.length > 0 ? (
          <table className="feedbacks-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedbacks) => (
                <tr key={feedbacks.id}>
                  <td>{feedbacks.name}</td>
                  <td>{feedbacks.message}</td>
                  <td>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => openDeleteModal(feedbacks)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-feedbacks-container">
            <p className="no-feedbacks">No Feedbacks Available!</p>
          </div>
        )}
      </div>

      <CustomModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        animationSource={deleteAnimation}
        title="Confirm Deletion"
        description="Are you sure you want to delete this feedback?"
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
          if (feedbackToDelete) {
            handleDelete(feedbackToDelete.id);
          }
        }}
      />
    </section>
  );
};

export default FeedBacks;
