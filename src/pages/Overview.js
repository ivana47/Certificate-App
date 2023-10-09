import React, { useEffect, useState } from "react";
import CertificateItem from "../components/CertificateItem";
import { useNavigate } from "react-router-dom";
import {
  getCertificateId,
  getListCertificates,
  removeCertificate,
} from "../services/localstorage";
import PersonsDialog from "./PersonsDialog";
import CloseIcon from "@mui/icons-material/Close";

const Overview = ({ certificate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [selectedPersonInfo, setSelectedPersonInfo] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedPeopleInfo, setSelectedPeopleInfo] = useState([]);
  const [localSelectedPeopleInfo, setLocalSelectedPeopleInfo] = useState([]);

  useEffect(() => {
    setCertificates(getListCertificates());
  }, []);

  //local storage people
  useEffect(() => {
    localStorage.setItem(
      "selectedPeopleInfo",
      JSON.stringify(selectedPeopleInfo),
    );
    setLocalSelectedPeopleInfo(selectedPeopleInfo);
    console.log("Data saved to localStorage:", selectedPeopleInfo);
  }, [selectedPeopleInfo]);

  useEffect(() => {
    const savedSelectedPeopleInfo = localStorage.getItem("selectedPeopleInfo");
    if (savedSelectedPeopleInfo) {
      const parsedData = JSON.parse(savedSelectedPeopleInfo);
      setSelectedPeopleInfo(parsedData);
      setLocalSelectedPeopleInfo(parsedData);
      console.log("Data retrieved from localStorage:", parsedData);
    }
  }, []);

  // const certificates = [
  //   {
  //     supplier: 'Company A',
  //     certificateType: '',
  //     validFrom: '2023-01-01',
  //     validTo: '2023-12-31',
  //   },
  //   {
  //     supplier: 'Company B',
  //     certificateType: '',
  //     validFrom: '2023-02-01',
  //     validTo: '2023-11-30',
  //   },
  // ];
  let navigate = useNavigate();

  const handleNewCertificateClick = () => {
    let path = "/new-certificate";
    navigate(path);
  };

  const [showMenu, setShowMenu] = useState(false);
  const [selectedCertificateIndex, setSelectedCertificateIndex] =
    useState(null);

  const handleIconClick = (index) => {
    setSelectedCertificateIndex(index);
    setShowMenu(true);
  };

  const handleEditClick = (id) => {
    let path = `/new-certificate-edit/${id}`;
    const certificateToEdit = getCertificateId(id); // Fetch the certificate by id
    navigate(path, { state: { certificate: certificateToEdit } }); // Pass it as state
  };

  const handleDeleteClick = (id) => {
    console.log(`Deleting certificate with ID: ${id}`);
    removeCertificate(id);
    setCertificates(getListCertificates());
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleAddParticipantClick = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <button
        style={{
          marginBottom: "8px",
          background: "#c0cc3a",
          width: "120px",
          height: "35px",
          color: "white",
          borderColor: "white",
        }}
        onClick={handleNewCertificateClick}
      >
        New Certificate
      </button>

      <table
        style={{
          borderCollapse: "collapse",
          width: "280%",
          fontSize: "16px",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}></th>
            <th style={tableHeaderStyle}>Supplier</th>
            <th style={tableHeaderStyle}>Certificate type</th>
            <th style={tableHeaderStyle}>Valid from</th>
            <th style={tableHeaderStyle}>Valid to</th>
          </tr>
        </thead>

        <tbody>
          {certificates.map((certificate, index) => (
            <CertificateItem
              key={index}
              certificate={certificate}
              index={index}
              id={certificate.id}
              showMenu={showMenu}
              selectedCertificateIndex={selectedCertificateIndex}
              setCertificates={setCertificates}
              handleIconClick={handleIconClick}
              handleEditClick={handleEditClick}
              handleDeleteClick={() => handleDeleteClick(certificate.id)}
            />
          ))}
        </tbody>
      </table>
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          fontStyle: "italic",
          marginTop: "20px",
          marginBottom: "-13px",
          marginLeft: "7px",
        }}
      >
        Assigned users
      </label>
      <button
        style={{
          width: "120px",
          height: "35px",
          marginTop: "20px",
          borderColor: "white",
        }}
        onClick={handleAddParticipantClick}
      >
        Add participant
      </button>
      <PersonsDialog
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        //  setSelectedPersonInfo={setSelectedPersonInfo}
        setSelectedPerson={setSelectedPersonInfo}
        setSelectedDepartment={setSelectedDepartment}
        setSelectedEmail={setSelectedEmail}
        setSelectedPeopleInfo={setSelectedPeopleInfo}
      // setForm={setForm}
      // inputValues={inputValues}
      />
      {/* otvaram dialog od persons */}

      <table
        style={{
          borderCollapse: "collapse",
          width: "280%",
          fontSize: "16px",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={tableHeaderStyle}></th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Department</th>
            <th style={tableHeaderStyle}>E-mail</th>
          </tr>
        </thead>

        <tbody>
          {selectedPeopleInfo.map((person, index) => (
            <tr key={index}>
              <td style={{ ...tableCellStyle, textAlign: "center" }}>
                <span>
                  <CloseIcon
                    style={{ cursor: "pointer" }}
                  // onClick={() => handleIconClick(index)}
                  />
                </span>
              </td>
              <td style={tableHeaderStyle}>{person.name}</td>
              <td style={tableHeaderStyle}>{person.department}</td>
              <td style={tableHeaderStyle}>{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHeaderStyle = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
};

const noCert = {
  fontSize: "19px",
  textAlign: "center",
  marginLeft: "110px",
};

const tableCellStyle = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "6px",
};

export default Overview;
