import { Box, Container } from "@mui/system"; // Importing Box and Container components from MUI system
import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import VacationCard from "../../components/VacationCard/VacationCard.tsx"; // Importing VacationCard component
import { DisableBtn, PageButton } from "../../styled"; // Importing styled components for buttons
import { GrFormNext, GrFormPrevious } from "react-icons/gr"; // Importing icons for pagination
import { getVacations } from "../../axios/VacationApi"; // Importing getVacations function from VacationApi
import FilterCard from "../../components/FilterCard/FilterCard.tsx"; // Importing FilterCard component
import { useUserContext } from "../../context/UserContext.tsx"; // Importing useUserContext hook from UserContext
import { UserRole } from "../../axios/UserAPI.ts"; // Importing UserRole enum from UserAPI

interface IVacation {
    id: number;
    destination: string;
    description: string;
    price: number;
    picture: string;
    start_date: string;
    end_date: string;
    is_following: boolean;
    followers_count: number;
}

const Home: React.FC = () => {
    const [vacations, setVacations] = useState<IVacation[]>([]); // State to manage vacations data
    const [total, setTotal] = useState(0); // State to manage total number of vacations
    const [filter, setFilter] = useState({ // State to manage filter settings
        follow: false,
        upcoming: false,
        active: false,
        page: 1,
        limit: 10,
    });
    const userContext = useUserContext(); // Access the user context
    const isAdmin = userContext.user?.role == UserRole.ADMIN; // Check if user is an admin

    // Function to fetch vacations data from the server based on filter settings
    const fetchData = async () => {
        try {
            const data = await getVacations({
                follow: filter.follow,
                upcoming: filter.upcoming,
                active: filter.active,
                page: filter.page,
                limit: filter.limit,
            });
            setTotal(data.totalRecords); // Set total number of vacations
            setVacations(data.results); // Set vacations data
        } catch (error) {
            console.log(error); // Log any errors
        }
    };

    useEffect(() => {
        fetchData(); // Fetch vacations data when component mounts or filter changes
    }, [filter]);

    // Function to handle pagination
    const paginate = (pageNumber: number) =>
        setFilter((prev) => ({ ...prev, page: pageNumber }));

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: "30px",
                marginBottom: "30px",
            }}
        >
            <Container maxWidth="xl">
                {!isAdmin && (
                    <FilterCard // Render filter card for non-admin users
                        filter={filter}
                        setFilter={setFilter}
                    />
                )}
                <Box
                    sx={{
                        display: "flex",
                        margin: "30px 0",
                        gap: "10px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {/* Render VacationCard component for each vacation */}
                    {vacations?.map(
                        ({
                            id,
                            description,
                            destination,
                            price,
                            picture,
                            start_date,
                            end_date,
                            is_following,
                            followers_count
                        }) => (
                            <VacationCard
                                id={id}
                                key={id}
                                image={picture}
                                title={destination}
                                description={description}
                                price={price}
                                start_date={start_date}
                                end_date={end_date}
                                isFollowing={is_following}
                                followers_count={followers_count}
                                fetchData={fetchData}
                            />
                        )
                    )}
                </Box>
                <Box
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                    }}
                >
                    {/* Render pagination buttons */}
                    <PageButton
                        onClick={() => paginate(filter.page - 1)}
                        disabled={filter.page === 1}
                    >
                        <GrFormPrevious style={{ fontSize: "25px" }} />
                    </PageButton>
                    {Array.from({ length: Math.ceil(total / filter.limit) }, (_, index) =>
                        !(filter.page === index + 1) ? (
                            <PageButton
                                key={index}
                                onClick={() => paginate(index + 1)}
                                disabled={filter.page === index + 1}
                            >
                                {index + 1}
                            </PageButton>
                        ) : (
                            <DisableBtn
                                key={index}
                                onClick={() => paginate(index + 1)}
                                disabled={filter.page === index + 1}
                            >
                                {index + 1}
                            </DisableBtn>
                        )
                    )}
                    <PageButton
                        onClick={() => paginate(filter.page + 1)}
                        disabled={filter.page === Math.ceil(total / filter.limit)}
                    >
                        <GrFormNext style={{ fontSize: "25px" }} />
                    </PageButton>
                </Box>
            </Container>
        </Box>
    );
};

export default Home; // Export the Home component
