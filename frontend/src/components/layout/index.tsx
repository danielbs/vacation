import React, { ReactNode } from "react"; // Importing React and the ReactNode type for TypeScript support
import Header from "../Header/Header.tsx"; // Importing the Header component to be included in every page that uses this layout

// Define an interface to type-check the props that the Layout component will receive
interface LayoutProps {
  children: ReactNode; // The 'children' prop will accept any valid React node
}

// Define the Layout functional component using TypeScript and the defined props interface
const Layout: React.FC<LayoutProps> = ({ children }) => {
  // The component returns a JSX fragment containing the Header component and any children components passed to Layout
  return (
    <>
     {/* // Always render the Header component at the top */}
      <Header />
      {/* // Render any child components passed into Layout below the Header */}
      {children} 
    </>
  );
};

export default Layout; // Export the Layout component so it can be used elsewhere in the application
