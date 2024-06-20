import { Box } from "@mui/system"; // Importing Box component from MUI system
import React from "react"; // Importing React library
import ModifyVacation from "../../components/ModifyVacation/ModifyVacation.tsx"; // Importing ModifyVacation component

const Manager: React.FC = () => {
  return (
    // Container to center the ModifyVacation component vertically and horizontally
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "gray",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -99,
        py: "50px" // Padding on the y-axis
      }}
    >
      {/* Render the ModifyVacation component */}
      <ModifyVacation />
    </Box>
  );
};

export default Manager; // Export the Manager component
