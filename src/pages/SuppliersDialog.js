import React, { useState } from "react";
import "../css/Dialog.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import SupplierTable from "../data/SupplierTable";
import { rows } from "../data/SupplierTable";

const SuppliersDialog = ({
    open,
    handleClose,
    setSelectedSupplier,
    setForm,
    inputValues,
}) => {
    const handleReset = () => {
        setSearchText("");
        setSearchTextIndex("");
        setSearchTextCity("");
        setFilteredRows(initialRows);
    };

    const [selectedSuppliers, setSelectedSuppliers] = useState([]); // State za selected suppliers

    const handleCheckboxChange = (name) => (event) => {
        if (event.target.checked) {
            setSelectedSuppliers([...selectedSuppliers, name]);
        } else {
            setSelectedSuppliers(
                selectedSuppliers.filter((selectedName) => selectedName !== name),
            );
        }
    };

    const handleSelectClick = () => {
        if (selectedSuppliers.length > 0) {
            setSelectedSupplier(selectedSuppliers[0]); //odabrani
        }
        setForm({
            ...inputValues,
            supplier: selectedSuppliers[0],
        });

        console.log("Selected Suppliers:", selectedSuppliers);
        handleClose();
    };
    const [initialRows] = useState(rows);
    const [searchText, setSearchText] = useState(""); //state za the search text
    const [filteredRows, setFilteredRows] = useState(rows); //state for filtered rows
    const [searchTextIndex, setSearchTextIndex] = useState("");
    const [searchTextCity, setSearchTextCity] = useState("");

    const handleSearch = () => {
        const filtered = rows.filter(
            (row) =>
                row.name.toLowerCase().includes(searchText.toLowerCase()) &&
                row.index.toString().includes(searchTextIndex) && //pretraga za index
                row.city.toLowerCase().includes(searchTextCity.toLowerCase()), //city
        );
        setFilteredRows(filtered);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    width: "100%",
                    maxWidth: "950px!important",
                    height: "800px",
                },
            }}
        >
            <div className="headerbox">
                <DialogTitle sx={{ m: 1, p: 0, fontSize: 17, fontWeight: "bold" }}>
                    Search for suppliers
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 10,
                        top: 13,
                        color: (theme) => theme.palette.grey[800],
                        border: "2px solid #d6d6d6",
                        borderRadius: "0",
                        width: "95px",
                        height: "26px",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </div>{" "}
            {/* headerbox */}
            <DialogContent>
                <div className="container">
                    <div className="box1">
                        <div className="header_box1">
                            <p>
                                <ArrowDropDownIcon
                                    sx={{
                                        position: "relative",
                                        right: 5,
                                        top: 7,
                                        marginRight: -1,
                                    }}
                                />
                                Search criteria
                            </p>
                        </div>
                        <label
                            style={{
                                position: "relative",
                                left: "10px",
                                top: "20px",
                                display: "flex",
                                flexDirection: "column",
                                fontStyle: "italic",
                            }}
                        >
                            Supplier name
                            <TextField
                                size="small"
                                sx={{
                                    width: 245,
                                    fontStyle: "normal",
                                }}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </label>
                        <label
                            style={{
                                position: "relative",
                                left: "300px",
                                bottom: "38px",
                                display: "flex",
                                flexDirection: "column",
                                fontStyle: "italic",
                            }}
                        >
                            Supplier index
                            <TextField
                                size="small"
                                sx={{
                                    width: 245,
                                    fontStyle: "normal",
                                }}
                                value={searchTextIndex}
                                onChange={(e) => setSearchTextIndex(e.target.value)}
                            />
                        </label>
                        <label
                            style={{
                                position: "relative",
                                left: "600px",
                                bottom: "95px",
                                display: "flex",
                                flexDirection: "column",
                                fontStyle: "italic",
                            }}
                        >
                            City
                            <TextField
                                size="small"
                                sx={{
                                    width: 245,
                                    fontStyle: "normal",
                                }}
                                value={searchTextCity}
                                onChange={(e) => setSearchTextCity(e.target.value)}
                            />
                        </label>
                        <div className="buttonContainerFirst">
                            <Button
                                sx={{
                                    position: "relative",
                                    right: 10,
                                    width: 150,
                                    height: 35,
                                    border: "2px solid #d6d6d6",
                                    borderRadius: "0",
                                    backgroundColor: "#2a587a",
                                    color: "#ffff",
                                }}
                                onClick={handleSearch}
                            >
                                Search
                            </Button>

                            <Button
                                sx={{
                                    position: "relative",
                                    width: 150,
                                    height: 35,
                                    border: "2px solid #d6d6d6",
                                    borderRadius: "0",
                                }}
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>{" "}
                    {/* box1 */}
                    <div className="box2">
                        <div className="header_box2">
                            <p>
                                <ArrowDropDownIcon
                                    sx={{
                                        position: "relative",
                                        right: 5,
                                        top: 7,
                                        marginRight: -1,
                                    }}
                                />
                                Supplier list
                            </p>
                        </div>
                        <SupplierTable
                            rows={filteredRows}
                            handleCheckboxChange={handleCheckboxChange}
                            selectedSuppliers={selectedSuppliers}
                        />{" "}
                        {/*tabela podataka*/}
                    </div>{" "}
                    {/* box2 */}
                    <div className="buttonContainer">
                        <Button
                            sx={{
                                width: 150,
                                height: 35,
                                border: "2px solid #d6d6d6",
                                borderRadius: "0",
                                backgroundColor: "#f0d093",
                            }}
                            onClick={handleSelectClick}
                        >
                            Select
                        </Button>
                        <Button
                            sx={{
                                width: 150,
                                height: 35,
                                border: "2px solid #d6d6d6",
                                borderRadius: "0",
                            }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SuppliersDialog;
