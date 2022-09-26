import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Modal from "./Modal";
import "./editTask.css";
import { toast } from "react-toastify";
import { useStore } from "../config/zustandStore";

function EditTask({ open, onClose, toEditTitle, toEditDescription, id }) {
  const { startLoading, stopLoading } = useStore((state) => state);
  const [title, setTitle] = useState(toEditTitle);
  const [description, setDescription] = useState(toEditDescription);

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault();
    startLoading();
    const taskDocRef = doc(db, "tasks", id);
    try {
      await updateDoc(taskDocRef, {
        title,
        description,
      });
      onClose();
      toast.success("Task updated successfully");
      setTitle("");
      setDescription("");
    } catch (err) {
      toast.error(err.message);
    } finally {
      stopLoading();
    }
  };
  return (
    <Modal modalLable="Edit Task" onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className="editTask" name="updateTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </Modal>
  );
}

export default EditTask;
