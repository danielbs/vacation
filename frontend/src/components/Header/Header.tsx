import {Box, Container} from "@mui/system"; // Importing Box and Container components from MUI
import {Description} from "../../styled"; // Importing Description styled component
import {useUserContext} from "../../context/UserContext"; // Importing custom hook to access user context
import {AppBar, Button, Toolbar, Typography} from "@mui/material"; // Importing MUI components
import {useNavigate} from "react-router-dom"; // Importing hook for programmatic navigation
import {UserRole, logout} from "../../axios/UserAPI"; // Importing user role enum and logout function from API

const Header = () => {
    const userContext = useUserContext(); // Accessing user context using custom hook
    const navigate = useNavigate(); // Accessing navigate function for programmatic navigation

    // Function to handle logout
    const handleLogout = async () => {
        try {
            await logout(); // Calling logout function from API
            navigate("/login"); // Redirecting to login page
            localStorage.removeItem("accessToken"); // Removing access token from local storage
            userContext.setUser(null); // Setting user context to null
        } catch (error) {
            console.log(error); // Logging any errors
        }
    }

    // Checking if user is logged in
    const isLogin = !!userContext.user;
    // Checking if logged in user is an admin
    const isAdmin = userContext.user?.role === UserRole.ADMIN;

    return (
        // AppBar component from MUI with custom styling
        <AppBar
            position="static"
            sx={{
                width: "100%",
                height: "80px",
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                backgroundColor: "#fff",
                border: "1px solid",
                borderColor: "#EAEDF0",
            }}
        >
            <Container maxWidth="xl" sx={{height: "100%"}}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    {/* Box component for styling the logo */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            borderBottomRightRadius: "20px",
                            borderBottomLeftRadius: "20px",
                            border: "1px solid",
                            borderColor: "#EAEDF0",
                            borderTop: "0",
                        }}
                    >
                        {/* Styling the logo text */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#388FF3",
                                borderRadius: "10px",
                                padding: "5px 15px"
                            }}
                        >
                            <Description
                                sx={{
                                    color: "#fff",
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                }}
                            >
                                Vacations
                            </Description>
                        </Box>
                    </Box>

                    {/* Toolbar component for positioning other elements */}
                    <Toolbar
                        sx={{
                            alignSelf: "left",
                            marginLeft: "auto"
                        }}
                    >
                        {/* Displaying user's name if logged in */}
                        {isLogin && (
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    color: "#000000"
                                }}
                            >
                                {`${userContext.user?.firstName} ${userContext.user?.lastName}`}
                            </Typography>
                        )}
                        {/* Conditional rendering of buttons based on login status */}
                        {isLogin ? (
                            // Rendering buttons for logged-in users
                            <>
                                {/* Buttons for admin users */}
                                {isAdmin && (
                                    <>
                                        <Button onClick={() => navigate("/report")} variant="contained"
                                                sx={{marginLeft: "15px"}}>Report</Button>
                                        <Button onClick={() => navigate("/add-vacation")} variant="contained"
                                                sx={{marginLeft: "15px"}}>Add a vacation</Button>
                                    </>
                                )}
                                {/* Button to logout */}
                                <Button onClick={handleLogout} variant="contained" color="error"
                                        sx={{marginLeft: "15px"}}>Logout</Button>
                            </>
                        ) : (
                            // Rendering buttons for not logged-in users
                            <Box>
                                <Button variant="contained" color="inherit"
                                        onClick={() => navigate("/login")}>Login</Button>
                                <Button sx={{marginLeft: "10px"}} variant="contained"
                                        onClick={() => navigate("/register")}>Register</Button>
                            </Box>
                        )}
                    </Toolbar>
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header; // Exporting the Header component
