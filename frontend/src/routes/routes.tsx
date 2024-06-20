import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Home from "../pages/Home/Home.tsx";
import Login from "../pages/Login/Login.tsx";
import Manager from "../pages/ModifyVacation/ModifyVacation.tsx";
import Register from "../pages/Register/Login.tsx";
import Report from "../pages/Report/Report.tsx";

// Array containing route configurations
export const routes = [
  {
    // Home Route
    path: "/", // URL path
    component: ( // Component to render
      <PrivateRoute> {/* PrivateRoute component for authentication */}
        <Home /> {/* Home component */}
      </PrivateRoute>
    ),
  },
  {
    // Login Route
    path: "/login", // URL path
    component: <Login />, // Login component
  },
  {
    // Register Route
    path: "/register", // URL path
    component: <Register />, // Register component
  },
  {
    // Add Vacation Route
    path: "/add-vacation", // URL path
    component: ( // Component to render
      <PrivateRoute isAdminPage={true}> {/* PrivateRoute for admin access */}
        <Manager /> {/* Manager component */}
      </PrivateRoute>
    ),
  },
  {
    // Edit Vacation Route
    path: "/edit-vacation/:vacationId", // URL path with dynamic parameter
    component: ( // Component to render
      <PrivateRoute isAdminPage={true}> {/* PrivateRoute for admin access */}
        <Manager /> {/* Manager component */}
      </PrivateRoute>
    ),
  },
  {
    // Report Route
    path: "/report", // URL path
    component: ( // Component to render
      <PrivateRoute isAdminPage={true}> {/* PrivateRoute for admin access */}
        <Report /> {/* Report component */}
      </PrivateRoute>
    ),
  }
];
