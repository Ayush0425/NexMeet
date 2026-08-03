import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/auth/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-red-500 px-5 py-2 font-medium text-white transition hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default LogoutButton;