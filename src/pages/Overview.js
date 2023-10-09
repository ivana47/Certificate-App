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
  const [localSelectedPeopleInfo, setLocalSelectedPeopleInfo] = useState([]);
  const [selectedPeopleInfo, setSelectedPeopleInfo] = useState(() => {
    const savedSelectedPeopleInfo = localStorage.getItem("selectedPeopleInfo");
    if (savedSelectedPeopleInfo) {
      return JSON.parse(savedSelectedPeopleInfo);
    }
    return [];
  });

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
      const parsedData = savedSelectedPeopleInfo ? JSON.parse(savedSelectedPeopleInfo) : [];
      setSelectedPeopleInfo(parsedData);
      setLocalSelectedPeopleInfo(parsedData);
      console.log("Data retrieved from localStorage:", parsedData);
    }
  }, []);


  const handleIconClickClose = (index) => {
    const updatedSelectedPeopleInfo = [...selectedPeopleInfo];

    updatedSelectedPeopleInfo.splice(index, 1);

    setSelectedPeopleInfo(updatedSelectedPeopleInfo);

    localStorage.setItem("selectedPeopleInfo", JSON.stringify(updatedSelectedPeopleInfo));
  };


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

  const handleAddParticipantClick = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  //HANDLING COMMENTS

  //state for comment input fields and author
  const [newComment, setNewComment] = useState({
    author: localStorage.getItem("selectedUser"), //saved user  on local storage
    text: "",
  });

  //store comments from user
  const [userComments, setUserComments] = useState(() => {
    const storedComments = localStorage.getItem("userComments"); //from local storage or empty
    return storedComments ? JSON.parse(storedComments) : {};
  });

  //show the comment section
  const [showCommentSection, setShowCommentSection] = useState(false);

  //opening the comment input fields
  const handleNewComment = () => {
    setShowCommentSection(!showCommentSection);
  };

  //submitting a comment
  const handleSubmitComment = () => {

    //user name from local storage
    const author = localStorage.getItem("selectedUser");

    //comment object
    const newCommentObj = {
      author: author,
      text: newComment.text,
    };

    //to get current user comment or empty array
    const userCommentList = userComments[author] || [];

    const updatedUserComments = {
      ...userComments,
      [author]: [...userCommentList, newCommentObj], 
    };

    //update state with the new user comments
    setUserComments(updatedUserComments);
    
    localStorage.setItem("userComments", JSON.stringify(updatedUserComments)); //save on local s
//clear
    setNewComment({
      author: author,
      text: "", 
    });
    setShowCommentSection(false);
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
      <button
        style={{
          position: "relative",
          width: "140px",
          height: "35px",
          marginTop: "20px",
          left: "1230px",
          borderColor: "white",
          backgroundColor: "#3f9acf",
          color: "white",
        }}
        onClick={handleNewComment}
      >
        New comment
      </button>

      <PersonsDialog
        open={isDialogOpen}
        handleClose={handleCloseDialog}
        setSelectedPerson={setSelectedPersonInfo}
        setSelectedDepartment={setSelectedDepartment}
        setSelectedEmail={setSelectedEmail}
        setSelectedPeopleInfo={setSelectedPeopleInfo}
      // setForm={setForm}
      />
      {/* otvara se dialog od persons */}

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
                    onClick={() => handleIconClickClose(index)}
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
      {showCommentSection && (
        <div style={{ marginTop: "30px" }} >
          <label style=
            {{
              fontStyle: "italic",
              fontSize: "14px",
              display: "flex",
              marginBottom: "5px",
              flexDirection: "column"
            }}>
            Author: {newComment.author}
          </label>
          <textarea
            style={{
              width: "400px",
              height: "150px"
            }}
            placeholder="Write your comment..."
            value={newComment.text}
            onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
          >
          </textarea>
          <button
            style=
            {{
              fontStyle: "italic",
              width: "100px",
              height: "30px",
              fontSize: "17px",
              display: "flex",
              flexDirection: "column",
              background: "#981b24",
              color: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleSubmitComment}>
            Comment
          </button>
        </div>
      )}
      <div style=
        {{
          fontSize: "16px",
          marginTop: "12px"
        }}>

        {Object.entries(userComments).map(([author, comments], index) => (
          <div key={index}>
            <div>User: {author}</div>
            {comments.map((comment, commentIndex) => (
              <div key={commentIndex}>
                Comment: {comment.text}
              </div>
            ))}
          </div>
        ))}

      </div>

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
