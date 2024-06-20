import { Box } from "@mui/system"; // Importing Box component from MUI system
import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import Auth from "../../components/Auth/Auth.tsx"; // Importing Auth component
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import parseApiError from "../../helper/parseAPIError"; // Importing parseApiError function
import { toastError } from "../../toast/toast"; // Importing toastError function for displaying error toast
import { AxiosError } from "axios"; // Importing AxiosError type from axios
import { signIn } from "../../axios/UserAPI"; // Importing signIn function from UserAPI
import { useUserContext } from "../../context/UserContext"; // Importing useUserContext hook from UserContext

const Login: React.FC = () => {
  // State to manage form data
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  // Access the user context to update user data after successful login
  const userContext = useUserContext();
  
  // State to manage loading state during form submission
  const [loading, setLoading] = useState(false);
  
  // Access the navigate function to redirect after successful login
  const navigate = useNavigate();

  // Effect to prevent scrolling when the login page is mounted
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = ""; // Enable scrolling when component unmounts
    };
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      setLoading(true); // Set loading state to true
      // Send login request to the server
      const user = await signIn(data);
      // Store access token in local storage
      localStorage.setItem("accessToken", user.accessToken);
      // Update user context with user data
      userContext.setUser(user.user);
      // Redirect user to the home page
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) { // Check if the error is an AxiosError
        // Parse API error and display error messages as toasts
        const errors = parseApiError(error);
        errors.forEach(err => toastError(err));
      }
      console.log(error); // Log any other errors to the console
    } finally {
      setLoading(false); // Set loading state to false after submission
    }
  };

  return (
    // Container to center the login form vertically and horizontally
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        width: "100%",
        height: "100vh",
        position: "absolute",
        zIndex: -99,
        overflowX: "hidden",
      }}
    >
      {/* Render the Auth component with login form */}
      <Auth
        text="Login" // Text for the submit button
        firstname={false} // Disable first name input field
        lastname={false} // Disable last name input field
        email={true} // Enable email input field
        password={true} // Enable password input field
        handleSubmit={handleSubmit} // Function to handle form submission
        data={data} // Form data
        setData={setData} // Function to update form data
        isSubmitted={loading} // Loading state during form submission
      />
    </Box>
  );
};

export default Login; // Export the Login component
