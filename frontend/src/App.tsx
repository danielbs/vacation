// Importing Box component from Material UI system
import { Box } from "@mui/system";

// Importing necessary React functionalities
import React, { Suspense, useEffect, useState } from "react";

// Importing a Loader component from a specific directory
import { Loader } from "./components/Loader/Loader.tsx";

// Importing routing functionalities from react-router-dom
import { Routes, Route, useNavigate } from "react-router-dom";

// Importing routes configuration from a custom file
import { routes } from "./routes/routes";

// Importing Layout component from components directory
import Layout from "./components/layout";

// Importing a function to refresh user data from an API module
import { refreshUser } from "./axios/UserAPI";

// Importing a context hook for user data management
import { useUserContext } from "./context/UserContext";

// Defining the main App component as a functional component
const App: React.FC = () => {
  // State for managing loading status
  const [loading, setLoading] = useState(true);

  // Accessing userContext for global user state management
  const userContext = useUserContext();

  // Hook for navigation
  const navigate = useNavigate();

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      // API call to refresh user data
      const user = await refreshUser();
      // Storing access token in localStorage
      localStorage.setItem("accessToken", user.accessToken);
      // Updating user context with fetched user
      userContext.setUser(user.user);
    } catch (error) {
      // Logging error and removing access token if fetching fails
      console.log(error);
      localStorage.removeItem("accessToken");
      // Navigating to login route on error
      navigate('/login');
    } finally {
      // Setting loading state to false once operation is complete
      setLoading(false);
    }
  }

  // useEffect hook to fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Conditional rendering: if still loading, show the loader
  if (loading) {
    return (
      <Box 
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}      
      >
          <Loader/>
      </Box>
    )
  }

  // Main component rendering with Suspense for handling async component loading
  return (
    <Suspense
      fallback={
        // Loader displayed as a fallback while loading async components
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      }
    >
      {/* // Layout component wrapping the routes */}
      <Layout>
        {/* // Dynamic routes rendering based on routes config */}
        <Routes>
          {routes?.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
        </Routes>
      </Layout>
    </Suspense>
  );
};

// Exporting the App component as default
export default App;
