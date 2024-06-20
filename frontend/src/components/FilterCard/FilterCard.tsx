import { Box } from "@mui/system"; // Importing Box component from MUI
import { Checkbox } from "@mui/material" // Importing Checkbox component from MUI
import React from "react"; // Importing React library
import { Text } from "../../styled"; // Importing custom Text component from styled file

interface IFilter { // Defining props interface for FilterCard component
  filter: { // Object containing filter settings
    follow: boolean; // Indicates whether to filter by followed vacations
    upcoming: boolean; // Indicates whether to filter by upcoming vacations
    active: boolean; // Indicates whether to filter by active vacations
    page: number; // Current page number
    limit: number; // Limit of vacations per page
  };
  setFilter: React.Dispatch< // Function to update filter settings
    React.SetStateAction<{ // Type of state update function
      follow: boolean; // Indicates whether to filter by followed vacations
      upcoming: boolean; // Indicates whether to filter by upcoming vacations
      active: boolean; // Indicates whether to filter by active vacations
      page: number; // Current page number
      limit: number; // Limit of vacations per page
    }>
  >;
}

const FilterCard: React.FC<IFilter> = ({ filter, setFilter }) => { // FilterCard component definition with props
  const changeFilter = (type: "follow" | "upcoming" | "active") => { // Function to toggle filter settings
    setFilter((prev) => ({ ...prev, [type]: !prev[type] })); // Updating filter settings based on previous state
  };

  const filters = [ // Array of filter options
    {
      check: filter.follow, // Whether to filter by followed vacations
      text: "Followed", // Text description of the filter option
      handleChange: () => changeFilter("follow"), // Function to toggle the filter option
    },
    {
      check: filter.upcoming, // Whether to filter by upcoming vacations
      text: "Did not started", // Text description of the filter option
      handleChange: () => changeFilter("upcoming"), // Function to toggle the filter option
    },
    {
      check: filter.active, // Whether to filter by active vacations
      text: "Active", // Text description of the filter option
      handleChange: () => changeFilter("active"), // Function to toggle the filter option
    },
  ];

  return (
    <Box
      sx={{
        maxWidth: "1130px", // Maximum width of the filter card
        width: "100%", // Full width of the filter card
        maxHeight: "78px", // Maximum height of the filter card
        height: "78px", // Height of the filter card
        backgroundColor: "#fff", // Background color of the filter card
        borderRadius: "12px", // Border radius of the filter card
        margin: "30px auto", // Margin of the filter card
        display: "flex", // Display as flex container
        alignItems: "center", // Align items vertically
        justifyContent: "space-around", // Justify content evenly
        flexWrap: "wrap", // Wrap items to next line if necessary
      }}
    >
      {filters.map(({ check, text, handleChange }) => ( // Mapping through filter options
        <Box
          key={text} // Unique key for each filter option
          sx={{
            height: "32px", // Height of each filter option
            display: "flex", // Display as flex container
            alignItems: "center", // Align items vertically
            justifyContent: "center", // Justify content horizontally
            gap: "5px", // Gap between checkbox and text
          }}
        >
          <Checkbox // Checkbox component for filter option
            value={check} // Value of the checkbox
            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} // Styling for checkbox icon
            onClick={handleChange} // Function to handle checkbox click event
          />
           {/* // Text description of the filter option */}
          <Text>{text}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default FilterCard; // Exporting the FilterCard component
