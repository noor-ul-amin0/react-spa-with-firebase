import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedLayout from "./ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PushNotification from "./components/PushNotification";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
      <PushNotification />
    </div>
  );
}

export default App;
