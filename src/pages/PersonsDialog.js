import React, { useEffect, useState } from "react";
import "../css/Dialog.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextField from "@mui/material/TextField";
import PersonTable from "../data/PersonTable";
import { rows } from "../data/PersonTable";

const PersonsDialog = ({
    open,
    handleClose,
    setSelectedPeopleInfo,
    selectedPeopleInfo,
    setSelectedPerson,
    setSelectedDepartment,
    setSelectedEmail,
    setForm,
    inputValues,
}) => {
    const handleReset = () => {
        setSearchText("");
        setSearchTextFname("");
        setSearchTextID("");
        setSearchTextDepartment("");
        setSearchTextPlant("");
        setFilteredRows(initialRows);
    };
    const handleSelectAll = () => {
        if (selectedPersons.length === filteredRows.length) {
            //ako su selekt,deselkt cemo
            setSelectedPersons([]);
        } else {
            setSelectedPersons(filteredRows.map((row) => row.name));
        }
    };

    // local storage

    //   useEffect(() => {
    //     const savedSelectedPeopleInfo = localStorage.getItem('selectedPeopleInfo');
    //     if (savedSelectedPeopleInfo) {
    //       setSelectedPeopleInfo(JSON.parse(savedSelectedPeopleInfo));
    //     }
    //   }, []);

    const [selectedPersons, setSelectedPersons] = useState([]);

    const handleCheckboxChange = (name) => (event) => {
        //dohvata jednog
        if (event.target.checked) {
            setSelectedPersons([...selectedPersons, name]);
        } else {
            setSelectedPersons(
                selectedPersons.filter((selectedName) => selectedName !== name),
            );
        }
        console.log("Selected Persons:", selectedPersons);
    };
    //uzima jedan
    // const handleSelectClick = () => {
    //     if (selectedPersons.length > 0) {
    //       const selectedPerson = selectedPersons[0];
    //       const personInfo = filteredRows.find((row) => row.name === selectedPerson);
    //       if (personInfo) {
    //         const formattedInfo = `${personInfo.name}, ${personInfo.fName} (${personInfo.plant})`;
    //         const formattedName = `${personInfo.name}${personInfo.fName}`;
    //         const formattedEmail = `${formattedName}@mail.com`;
    //         setSelectedPerson(formattedInfo);
    //         setSelectedDepartment(personInfo.department);
    //         setSelectedEmail(formattedEmail);
    //       }
    //     }
    //     handleClose();
    //   };

    const handleSelectClick = () => {
        if (selectedPersons.length > 0) {
            const selectedInfo = selectedPersons.map((selectedPerson) => {
                const personInfo = filteredRows.find(
                    (row) => row.name === selectedPerson,
                );
                if (personInfo) {
                    const formattedInfo = `${personInfo.name}, ${personInfo.fName} (${personInfo.plant})`;
                    const formattedName = `${personInfo.name}${personInfo.fName}`;
                    const formattedEmail = `${formattedName}@mail.com`;
                    return {
                        name: formattedInfo,
                        department: personInfo.department,
                        email: formattedEmail,
                    };
                }
                return null;
            });

            // redovi bez data
            const filteredSelectedInfo = selectedInfo.filter((info) => info !== null);

            setSelectedPeopleInfo((prevSelectedPeopleInfo) => [
                ...prevSelectedPeopleInfo,
                ...filteredSelectedInfo,
            ]); //update

            localStorage.setItem(
                "selectedPeopleInfo",
                JSON.stringify(selectedPeopleInfo),
            );
            handleClose();
        }
    };

    const [initialRows] = useState(rows);
    const [searchText, setSearchText] = useState(""); //for name
    const [filteredRows, setFilteredRows] = useState(rows);
    const [searchTextFname, setSearchTextFname] = useState("");
    const [searchTextID, setSearchTextID] = useState("");
    const [searchTextDepartment, setSearchTextDepartment] = useState("");
    const [searchTextPlant, setSearchTextPlant] = useState("");

    const handleSearch = () => {
        const filtered = rows.filter(
            (row) =>
                row.name.toLowerCase().includes(searchText.toLowerCase()) &&
                row.fName.toLowerCase().includes(searchTextFname) &&
                row.id.toLowerCase().includes(searchTextID.toLowerCase()) &&
                row.department.toLowerCase().includes(searchTextDepartment) &&
                row.plant.toString().includes(searchTextPlant),
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
                    Search for persons
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
                            Name
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
                            First name
                            <TextField
                                size="small"
                                sx={{
                                    width: 245,
                                    fontStyle: "normal",
                                }}
                                value={searchTextFname}
                                onChange={(e) => setSearchTextFname(e.target.value)}
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
                            User ID
                            <TextField
                                size="small"
                                sx={{
                                    width: 245,
                                    fontStyle: "normal",
                                }}
                                value={searchTextID}
                                onChange={(e) => setSearchTextID(e.target.value)}
                            />
                        </label>
                        <label
                            style={{
                                position: "relative",
                                left: "10px",
                                bottom: "95px",
                                display: "flex",
                                flexDirection: "column",
                                fontStyle: "italic",
                            }}
                        >
                            Department
                            <TextField
                                size="small"
                                sx={{
                                    width: 245,
                                    fontStyle: "normal",
                                }}
                                value={searchTextDepartment}
                                onChange={(e) => setSearchTextDepartment(e.target.value)}
                            />
                        </label>
                        <label
                            style={{
                                position: "relative",
                                left: "300px",
                                bottom: "155px",
                                display: "flex",
                                flexDirection: "column",
                                fontStyle: "italic",
                            }}
                        >
                            Plant
                            <TextField
                                size="small"
                                sx={{
                                    width: 245,
                                    fontStyle: "normal",
                                }}
                                value={searchTextPlant}
                                onChange={(e) => setSearchTextPlant(e.target.value)}
                            />
                        </label>

                        <div className="buttonContainerFirst">
                            <Button
                                sx={{
                                    position: "relative",
                                    right: 10,
                                    bottom: 30,
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
                                    bottom: 30,
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
                                Person list
                            </p>
                        </div>
                        <PersonTable
                            rows={filteredRows}
                            handleCheckboxChange={handleCheckboxChange}
                            selectedPersons={selectedPersons} 
                            handleSelectAll={handleSelectAll}
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

export default PersonsDialog;
