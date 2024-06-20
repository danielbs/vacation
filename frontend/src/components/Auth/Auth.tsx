import { Box } from "@mui/system"; // Importing Box for layout from MUI
import React from "react"; // Standard React import
import {
  BlueButton,
  Description,
  FormBox,
  Input,
  Label,
  Text,
  WhiteButton,
} from "../../styled"; // Importing styled components for UI consistency
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation

// Interface defining the props expected by the component
interface InputData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ICard {
  text: string; // Text to display, typically a heading like 'Login' or 'Register'
  firstname: boolean; // Flag to indicate if the firstname field should be shown
  lastname: boolean; // Flag for the lastname field
  email: boolean; // Flag for the email field
  password: boolean; // Flag for the password field
  data: InputData; // Object holding input data
  isSubmitted: boolean; // Flag to control button enabled state
  setData: React.Dispatch<React.SetStateAction<InputData>>; // Function to update state
  handleSubmit: (e: React.FormEvent) => void; // Function to handle form submission
}

const Auth: React.FC<ICard> = ({
  text,
  firstname,
  lastname,
  email,
  password,
  setData,
  data,
  handleSubmit,
  isSubmitted,
}) => {
  const navigate = useNavigate();

  // Function to update local state based on form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "378px",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box>
          <Description>{text}</Description>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginTop: firstname ? "30px" : "54px", // Dynamic margin top
            }}
          >
            {/* Conditionally render input fields based on props */}
            {firstname && (
              <FormBox>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={handleChange}
                />
              </FormBox>
            )}
            {lastname && (
              <FormBox>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={handleChange}
                />
              </FormBox>
            )}
            {email && (
              <FormBox>
                <Label>Email</Label>
                <Input
                  name="email"
                  placeholder="Your email address"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </FormBox>
            )}
            {password && (
              <FormBox>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                />
              </FormBox>
            )}
          </Box>

          <Box
            sx={{
              width: "338px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            {/* Submit button */}
            {/* // Button text depends on whether it's a registration form */}
            <BlueButton disabled={isSubmitted} type="submit">
              {firstname ? "Register" : "Login"}
            </BlueButton>

            {/* Text prompting user to switch between login and register */}
            <Text
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px 0"
              }}
            >
              {firstname
                ? "Already have an account ?"
                : "Don’t have an account ?"}
            </Text>

            {/* Button to switch between login and registration views */}
            <WhiteButton
              onClick={() => navigate(firstname ? "/login" : "/register")}
              type="button"
            >
              {firstname ? "Login" : "Register"}
            </WhiteButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Auth;
