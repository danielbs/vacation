import { Box } from "@mui/system"; // Importing Box component from MUI
import { Typography, Button } from "@mui/material"; // Importing Typography and Button components from MUI
import Modal from '@mui/material/Modal'; // Importing Modal component from MUI
import React from "react"; // Importing React library

interface IModalProps { // Defining props interface for ConfirmModal component
    isOpen: boolean; // Indicates whether the modal is open or not
    onClose: () => void; // Function to handle modal close event
    handleDelete: () => void; // Function to handle delete action
}

const style = { // Styling object for modal content
    position: 'absolute', // Positioning the modal absolutely
    top: '50%', // Placing the modal at 50% from the top
    left: '50%', // Placing the modal at 50% from the left
    transform: 'translate(-50%, -50%)', // Centering the modal horizontally and vertically
    width: 400, // Setting the width of the modal
    background: '#ffffff', // Background color of the modal
    boxShadow: 24, // Adding a box shadow to the modal
    p: 4, // Adding padding to the modal
    borderRadius: "5px" // Adding border radius to the modal
};

const ConfirmModal: React.FC<IModalProps> = ({isOpen, onClose, handleDelete}) => { // ConfirmModal component definition with props
    return (
        <Modal
            open={isOpen} // Setting the modal open state
            onClose={onClose} // Handling modal close event
            aria-labelledby="modal-modal-title" // Accessible label for modal title
            aria-describedby="modal-modal-description" // Accessible description for modal content
        >
            <Box
                sx={style} // Applying styles to the modal content
            >
                 {/* // Displaying the confirmation message */}
                <Typography
                    sx={{
                        textAlign: "center" // Aligning the text to the center
                    }}
                    id="modal-modal-title" // Setting the ID for modal title
                    variant="h5" // Setting the typography variant to h5
                    component="h2" // Rendering as h2 element
                >
                    Are you sure?
                </Typography>
                <Box
                    sx={{
                        marginTop: "30px", // Adding top margin to the button container
                        width: "100%", // Setting the width of the button container
                        display: "flex", // Displaying buttons as flex container
                        justifyContent: "space-between" // Spacing buttons evenly
                    }}
                >
                     {/* // Displaying "Cancel" text on the button */}
                    <Button
                        onClick={onClose} // Handling click event to close the modal
                        variant="outlined" // Using outlined variant for "Cancel" button
                    >
                        Cancel
                    </Button>
                    {/* // Displaying "Delete" text on the button */}
                    <Button
                        variant="contained" // Using contained variant for "Delete" button
                        color="error" // Setting the button color to red for "Delete"
                        onClick={handleDelete} // Handling click event to trigger delete action
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmModal; // Exporting the ConfirmModal component
