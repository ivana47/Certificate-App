import React, { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import {
  addCertificate,
  editCertificate,
  getCertificateId,
  getListCertificates,
  removeSupplierValue,
} from "../services/localstorage";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SuppliersDialog from "./SuppliersDialog";

const NewCertificate = ({ setCertificates }) => {
  const { id } = useParams(); // izvlaci id
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(""); //state varijabla za cuvanje supplier name

  const handleSearchIconClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const { inputValues, handleInputChange, resetForm, setForm } = useForm({
    supplier: "",
    certificateType: "",
    validFrom: "",
    validTo: "",
  });

  useEffect(() => {
    if (id) {
      console.log("Fetching certificate details for ID:", id);

      const certificate = getCertificateId(id);
      console.log("Fetched certificate:", certificate);

      if (certificate) {
        setForm({
          supplier: certificate.supplier,
          certificateType: certificate.certificateType,
          validFrom: certificate.validFrom,
          validTo: certificate.validTo,
        });
      } else {
        console.log("Certificate not found for ID:", id);
      }
    } else {
      console.log("No ID provided for editing.");
    }
  }, [id]);

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9); //random id
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (id) {
      console.log("Updating certificate with ID:", id);
      editCertificate(id, inputValues);
    } else {
      //ako nema id-a dodamo novi
      console.log("Saving new certificate");
      const newCertificate = { id: generateId(), ...inputValues };

      addCertificate(newCertificate);
    }

    resetForm();
  };
  return (
    <div className="newC">
      <h2>New Certificate</h2>
      <form onSubmit={handleSave}>
        <div style={text}>
          <label>Supplier</label>
          <div style={{ position: "relative" }}>
            <input
              name="supplier"
              type="text"
              id="inputValid"
              // onChange={selectedSupplier}
              // value={selectedSupplier || ''}
              value={inputValues.supplier}
              readOnly
              style={inputStyle}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "35px",
                transform: "translateY(-50%)",
                borderLeft: "1px solid #000",
                padding: "17.2px",
              }}
            >
              <SearchIcon
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "7px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={handleSearchIconClick} //otvara dialog
              />
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "0.5px",
                transform: "translateY(-50%)",
                borderLeft: "1px solid #000",
                padding: "17.2px",
              }}
            >
              <CloseIcon
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "5px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  removeSupplierValue(id, setCertificates);
                  resetForm();
                  console.log("Supplier value removed:", inputValues.id);
                }}
              />
            </div>
          </div>
        </div>
        <div style={text}>
          <label>Certificate Type</label>
          <select
            name="certificateType"
            type="text"
            value={inputValues.certificateType}
            onChange={handleInputChange}
            id="inputValid"
            style={inputStyle}
          >
            <option value="">Select your option</option>
            <option value="CCC certificate">CCC certificate</option>
            <option value="Permission of Printing">
              Permission of Printing
            </option>
            <option value="OHSAS 18001">OHSAS 18001</option>
          </select>
        </div>
        <div style={text}>
          <label>Valid from</label>
          <input
            name="validFrom"
            type="date"
            value={inputValues.validFrom}
            onChange={handleInputChange}
            id="inputValid"
            style={inputStyle}
          />
        </div>
        <div style={text}>
          <label>Valid to</label>
          <input
            name="validTo"
            type="date"
            value={inputValues.validTo}
            onChange={handleInputChange}
            id="inputValid"
            style={inputStyle}
          />
        </div>
        <SuppliersDialog
          open={isDialogOpen}
          handleClose={handleCloseDialog}
          setSelectedSupplier={setSelectedSupplier}
          setForm={setForm}
          inputValues={inputValues}
        />
        {/* otvaram dialog o supplier */}

        <button type="submit" style={buttonStyle}>
          {id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

const text = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
  padding: "8px",
};

const inputStyle = {
  width: "650px",
  padding: "8px",
};

const buttonStyle = {
  marginTop: "10px",
  width: "100px",
  height: "30px",
  background: "#3f9acf",
  color: "white",
  border: "white",
  marginLeft: "280px",
};

export default NewCertificate;
