import { Box } from "@mui/system";
import {
    AddArea,
    AddAreaBox,
    AddFormBox,
    AddInput,
    BlueButton,
    Description,
    BorderBlurBtn,
    Label,
} from "../../styled";
import React, { useEffect, useRef, useState } from "react";
import { IoMdCloudDownload, IoMdDocument } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { IVacation } from "../../interfaces/IVacation";
import { createVacation, getVacationById, updateVacation } from "../../axios/VacationApi";
import { toastDismiss, toastError, toastLoading, toastSuccess } from "../../toast/toast";
import { AxiosError } from "axios";
import parseApiError from "../../helper/parseAPIError";


const ModifyVacation = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);  // Ref for file input to trigger with a button
    const { vacationId } = useParams();  // Retrieve params from URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState<IVacation>({
        destination: "",
        description: "",
        price: "",
        picture: null,
        start_date: "",
        end_date: "",
    });  // Form data state
    const [loading, setLoading] = useState(false);  // State to handle loading during API requests
    const isEditPage = !!vacationId;  // Boolean to determine if the page is for editing

    // Fetch vacation data if in edit mode
    const fetchData = async () => {
        if (!vacationId) return;
        try {
            const data: IVacation = await getVacationById(vacationId);
            setFormData(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Load vacation data on mount if edit mode
    useEffect(() => {
        if (isEditPage) {
            fetchData();
        }
    }, []);

    // Trigger file input when button is clicked
    const handleFileUpload = () => {
        fileInputRef.current?.click();
    };

    // Handle changes to form inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle file selection for image upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData((prev) => ({ ...prev, picture: file }));
        }
    };

    // Submit form data to create or update vacation
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toastLoading("Loading...");
        try {
            if (isEditPage) {
                await updateVacation(vacationId, formData);
            } else {
                await createVacation(formData);
            }
            toastSuccess("Saved successfully", toastId);
            if (isEditPage) {
                navigate("/");
            } else {
                setFormData({
                    destination: "",
                    description: "",
                    price: "",
                    picture: null,
                    start_date: "",
                    end_date: "",
                });
            }
        } catch (error) {
            toastDismiss(toastId);
            if (error instanceof AxiosError) {
                const errors = parseApiError(error);
                errors.forEach(item => toastError(item));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            className="add-card-container"
            sx={{
                maxWidth: "505px",
                width: "100%",
                height: "820px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                marginTop: "130px",
            }}
        >
            <form onSubmit={handleSubmit}>
                <Description>{isEditPage ? "Edit vacation" : "Add Vacation"}</Description>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "20px",
                        marginTop: "54px",
                    }}
                >
                    <AddFormBox>
                        <Label>Destination</Label>
                        <AddInput
                            name="destination"
                            placeholder="Destination"
                            onChange={handleChange}
                            value={formData.destination}
                        />
                    </AddFormBox>
                    <AddAreaBox>
                        <Label>Description</Label>
                        <AddArea
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                            value={formData.description}
                        />
                    </AddAreaBox>
                    <AddFormBox>
                        <Label>Start on</Label>
                        <AddInput
                            sx={{
                                paddingRight: "20px",
                                color: "gray",
                            }}
                            name="start_date"
                            type="date"
                            onChange={handleChange}
                            value={formData.start_date}
                        />
                    </AddFormBox>
                    <AddFormBox>
                        <Label>End on</Label>
                        <AddInput
                            sx={{
                                paddingRight: "20px",
                                color: "gray",
                            }}
                            name="end_date"
                            type="date"
                            onChange={handleChange}
                            value={formData.end_date}
                        />
                    </AddFormBox>
                    <AddFormBox>
                        <Label>Price</Label>
                        <AddInput
                            sx={{
                                color: "gray"
                            }}
                            name="price"
                            type="number"
                            placeholder="Price"
                            onChange={handleChange}
                            value={formData.price}
                        />
                    </AddFormBox>
                    <Box
                        sx={{
                            maxWidth: "466px",
                            width: "100%",
                            height: "150px",
                            border: 1,
                            borderColor: "gray",
                            borderRadius: "12px",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            backgroundColor: "#F0F3F7",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            cursor: "pointer",
                        }}
                        onClick={handleFileUpload}
                    >
                        <input
                            accept="image/*"
                            type="file"
                            name="picture"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        {formData.picture ? (
                            <IoMdDocument style={{ fontSize: "90px", color: "gray" }} />
                        ) : (
                            <IoMdCloudDownload style={{ fontSize: "90px", color: "gray" }} />
                        )}
                        {formData.picture && (
                            <Box
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "25px",
                                    color: "gray",
                                    textAlign: "center"
                                }}
                            >
                                {formData.picture.name}
                            </Box>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            width: "470px",
                        }}
                    >
                        <BlueButton
                            type="submit"
                            disabled={loading}
                        >{isEditPage ? "Save Changes" : "Add Vacation"}</BlueButton>
                        <BorderBlurBtn
                            onClick={() => navigate("..")}
                        >Cancel</BorderBlurBtn>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default ModifyVacation;
