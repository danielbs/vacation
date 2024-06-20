import { useEffect, useState } from "react";
import { downloadCsv, getVacationStats } from "../../axios/VacationApi.ts";
import { BarChart } from "@mui/x-charts"; // Importing BarChart component from MUI X Charts
import { Button, Box, Typography } from "@mui/material"; // Importing Button, Box, and Typography components from MUI

interface FollowerCount {
    destination: string;
    followersCount: number;
}

const Report = () => {
    // State to store vacation statistics data
    const [data, setData] = useState<FollowerCount[]>([]);

    // Function to fetch vacation statistics data from API
    const fetchData = async () => {
        const response: FollowerCount[] = await getVacationStats();
        setData(response);
    };

    // Function to handle download button click event
    const handleClick = async () => {
        // Download CSV file using API function
        const { data } = await downloadCsv();
        // Create a Blob from the CSV data
        const url = window.URL.createObjectURL(new Blob([data]));
        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'filename.csv'); // Set filename for download
        document.body.appendChild(link);
        link.click(); // Trigger click event to download
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Revoke object URL after download
    }

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography sx={{ marginTop: "40px" }} component="h1" variant="h4">
                Vacations report
            </Typography>
            <Box
                sx={{ display: "flex", flexDirection: "column" }}
            >
                {/* BarChart component displaying vacation statistics */}
                <BarChart
                    xAxis={[{ scaleType: 'band', data: data.map(item => item.destination) }]}
                    series={[{ data: data.map(item => item.followersCount) }]}
                    width={800}
                    height={500}
                />
                {/* Button to download CSV file */}
                <Button
                    sx={{
                        marginLeft: "auto"
                    }}
                    variant="contained"
                    onClick={handleClick}
                >Download CSV File</Button>
            </Box>
        </Box>
    );
};

export default Report;
