import { useNavigate } from "react-router-dom";

const useProtectedLink = (setIsLoginOpen, token) => {
  const navigate = useNavigate();

  const openProtectedLink = (path) => {
    if (!token) {
      // Save redirect link
      localStorage.setItem("redirectAfterLogin", path);

      // Open login modal
      setIsLoginOpen(true);
    } else {
      navigate(path); // If logged in → go to page
    }
  };

  return openProtectedLink;
};

export default useProtectedLink;
