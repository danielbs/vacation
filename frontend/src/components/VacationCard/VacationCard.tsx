import { Box } from "@mui/system"; // Importing Box component from MUI system for layout
import React, { useState } from "react"; // Importing React and useState hook
import DeleteIcon from "@mui/icons-material/Delete"; // Importing Delete icon from MUI icons
import EditIcon from "@mui/icons-material/Edit"; // Importing Edit icon from MUI icons

// Importing styled components for buttons and card descriptions
import {
    BlueButton,
    GrayButton,
    VCardDescription,
    VCardTitle,
} from "../../styled";
import { toastError, toastLoading, toastSuccess } from "../../toast/toast"; // Importing toast functions for notifications
import { useUserContext } from "../../context/UserContext"; // Importing custom hook to access user context
import { UserRole } from "../../axios/UserAPI"; // Importing UserRole enum for role checks
import { deleteVacation, followToVacation, unFollowToVacation } from "../../axios/VacationApi"; // Importing API functions for vacation operations
import { AxiosError } from "axios"; // Importing AxiosError type for error handling
import { useNavigate } from "react-router-dom"; // Importing hook for navigation
import ConfirmModal from "../ConfirmModal/ConfirmModal.tsx"; // Importing ConfirmModal component
import GroupAddIcon from '@mui/icons-material/GroupAdd'; // Importing GroupAdd icon from MUI icons

// Interface for props expected by VacationCard
interface IVacationCardProps {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
    start_date: string;
    end_date: string;
    isFollowing: boolean;
    followers_count: number;
    fetchData: () => Promise<void>; // Function to refresh data after an operation
}

const VacationCard: React.FC<IVacationCardProps> = ({
    id,
    image,
    title,
    description,
    price,
    start_date,
    end_date,
    isFollowing,
    fetchData,
    followers_count
}) => {
    const userContext = useUserContext(); // Access user context to get user details
    const navigate = useNavigate(); // Hook to navigate between routes
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false); // State for managing modal visibility
    const isAdmin = userContext.user?.role == UserRole.ADMIN; // Check if the current user is an admin

    // Function to handle following a vacation
    const handleFollow = async () => {
        const toastId = toastLoading("Loading..."); // Show loading toast
        try {
            await followToVacation(id); // API call to follow the vacation
            await fetchData(); // Refresh data
            toastSuccess("Success", toastId); // Show success toast
        } catch (error) {
            if (error instanceof AxiosError) {
                toastError(error.response?.data.message, toastId); // Show error toast if failure
            }
        }
    };

    // Function to handle unfollowing a vacation
    const handleUnFollow = async () => {
        const toastId = toastLoading("Loading..."); // Show loading toast
        try {
            await unFollowToVacation(id); // API call to unfollow the vacation
            await fetchData(); // Refresh data
            toastSuccess("Success", toastId); // Show success toast
        } catch (error) {
            if (error instanceof AxiosError) {
                toastError(error.response?.data.message, toastId); // Show error toast if failure
            }
        }
    };

    // Function to open the confirmation modal
    const openConfirmModal = async () => {
        setIsOpenConfirmModal(true); // Set modal open state to true
    }

    // Function to handle deletion of a vacation
    const handleDelete = async () => {
        const toastId = toastLoading("Loading..."); // Show loading toast
        try {
            await deleteVacation(id); // API call to delete the vacation
            await fetchData(); // Refresh data
            setIsOpenConfirmModal(false); // Close the confirmation modal
            toastSuccess("Vacation successfully deleted", toastId); // Show success toast
        } catch (error) {
            if (error instanceof AxiosError) {
                toastError(error.response?.data.message, toastId); // Show error toast if failure
            }
        }
    }

    // Function to handle editing of a vacation
    const handleEdit = () => {
        navigate(`/edit-vacation/${id}`); // Navigate to the edit vacation page
    };

    return (
        <>
            {/* Modal for confirming deletion */}
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                onClose={() => setIsOpenConfirmModal(false)}
                handleDelete={handleDelete}
            />
            <Box
                sx={{
                    position: "relative",
                    maxWidth: "360px",
                    borderRadius: "12px",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 2px gray",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        borderRadius: "12px 12px 0 0",
                        overflow: "hidden",
                        height: "240px",
                        width: "100%"
                    }}
                >
                    {/* Image of the vacation */}
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            background: "rgba(0, 0, 0, .25)",
                        }}
                    ></Box>
                    {/* Vacation title */}
                    <VCardTitle
                        sx={{
                            position: "absolute",
                            width: "100%",
                            zIndex: 2,
                            padding: "20px 0",
                        }}
                    >
                        {title}
                    </VCardTitle>
                </Box>
                {/* Edit and Delete options for admins */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: 2,
                    }}
                >
                    {isAdmin ? (
                        <Box
                            sx={{
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            {/* Edit button */}
                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    borderRadius: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-center",
                                    color: "gray",
                                    pr: "10px",
                                    cursor: "pointer",
                                    padding: "2px 5px",
                                    fontSize: '12px'
                                }}
                                onClick={() => handleEdit()}
                            >
                                <EditIcon
                                    sx={{
                                        fontSize: "20px"
                                    }}
                                />
                                EDIT
                            </Box>
                            {/* Delete button */}
                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    borderRadius: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-center",
                                    color: "gray",
                                    cursor: "pointer",
                                    padding: "2px 5px",
                                    fontSize: '12px',
                                    marginLeft: "10px",
                                }}
                                onClick={() => openConfirmModal()}
                            >
                                <DeleteIcon
                                    sx={{
                                        color: "",
                                        fontSize: "20px"
                                    }}
                                />
                                DELETE
                            </Box>
                        </Box>
                    ) : null}
                </Box>
                {/* Details section of the card */}
                <Box
                    sx={{
                        padding: "22px",
                        width: '100%'
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {/* Date range */}
                        <Box
                            sx={{
                                padding: "4px 8px",
                                backgroundColor: "#EAEDF0",
                                borderRadius: "8px",
                                color: "#63676C",
                                fontSize: "14px",
                                fontWeight: 400,
                            }}
                        >
                            {start_date} - {end_date}
                        </Box>
                        {/* Follower count */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <GroupAddIcon
                                sx={{
                                    fontSize: "20px"
                                }}
                            /> {followers_count}
                        </Box>
                    </Box>
                    {/* Vacation description */}
                    <VCardDescription
                        sx={{
                            width: "100%",
                            height: "155px",
                            overflowWrap: "break-word",
                            marginTop: "10px"
                        }}
                    >{description}</VCardDescription>

                    {/* Price display */}
                    <Box
                        sx={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            marginRight: "auto",
                            paddingLeft: "12px",
                            marginTop: "40px",
                            marginBottom: "5px"
                        }}
                    >
                        {price} $
                    </Box>
                    {/* Follow/Unfollow buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "space-between",
                            marginTop: "10px",
                        }}
                    >
                        {!isAdmin && (
                            !isFollowing ? (
                                <BlueButton
                                    onClick={() => handleFollow()}
                                    sx={{
                                        fontSize: "16px",
                                    }}
                                >Follow</BlueButton>
                            ) : (
                                <GrayButton
                                    sx={{
                                        fontSize: "16px",
                                    }}
                                    onClick={() => handleUnFollow()}
                                >Unfollow</GrayButton>
                            )
                        )}

                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default VacationCard; // Export the component
