import { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useStore } from "../config/zustandStore";
import Modal from "./Modal";
import "./addTask.css";
import { toast } from "react-toastify";

function AddTask({ onClose, open, userId = null }) {
  const { startLoading, stopLoading } = useStore((state) => state);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      await addDoc(collection(db, "tasks"), {
        userId,
        title,
        description,
        completed: false,
        created: Timestamp.now(),
      });
      onClose();
      stopLoading();
      toast.success("Task added successfully");
      setTitle("");
      setDescription("");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <Modal modalLable="Add Task" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
          value={title}
          placeholder="Enter title"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task decription"
          value={description}
        ></textarea>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
