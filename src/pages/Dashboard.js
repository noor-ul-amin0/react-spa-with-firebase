import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FadeLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../config/firebase";
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import "./dashboard.css";
import { useStore } from "../config/zustandStore";
import { useAuthState } from "react-firebase-hooks/auth";

const override = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};
function Dashboard() {
  const [user] = useAuthState(auth);
  const { isLoading, startLoading, stopLoading } = useStore((state) => state);
  const [tasks, setTasks] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  /* function to get all tasks from firestore in realtime */
  useEffect(() => {
    startLoading();
    onSnapshot(
      query(collection(db, "tasks"), where("userId", "==", user?.uid)),
      (querySnapshot) => {
        setTasks(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        stopLoading();
      }
    );
  }, []);
  return (
    <div className="taskManager">
      <FadeLoader size={80} loading={isLoading} cssOverride={override} />
      {!isLoading && (
        <div className="taskManager__container">
          <button onClick={() => setOpenAddModal(true)}>Add task +</button>
          <div className="taskManager__tasks">
            {tasks.map((task) => (
              <Task
                id={task.id}
                key={task.id}
                completed={task.data.completed}
                title={task.data.title}
                description={task.data.description}
              />
            ))}
          </div>
        </div>
      )}
      {openAddModal && (
        <AddTask
          userId={user?.uid}
          onClose={() => setOpenAddModal(false)}
          open={openAddModal}
        />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
