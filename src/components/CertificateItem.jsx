import React from 'react';
import * as BsIcons from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const CertificateItem = ({
  certificate,
  index,
  id,
  showMenu,
  selectedCertificateIndex,
  handleIconClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  const { supplier, certificateType, validFrom, validTo } = certificate;
  const navigate = useNavigate();
  return (
    <tr key={index}>
      <td style={{ ...tableCellStyle, textAlign: 'center' }}>
        <span>
          <BsIcons.BsGearFill
            style={{ color: '#3f9acf', cursor: 'pointer' }}
            onClick={() => handleIconClick(index)}
          />
        </span>
        {showMenu && selectedCertificateIndex === index && (
          <div className="menu" style={menuStyle}>
            {/* <span onClick={() => navigate(`/new-certificate-edit/${id}`)}>Edit</span> */}
            <span onClick={() => handleEditClick(id)}>Edit</span>
            <span onClick={() => handleDeleteClick(certificate.id)}>Delete</span>
          </div>
          //   <span onClick={() =>handleEditClick(certificate.id)}>Edit</span>

        )}
      </td>
      <td style={tableCellStyle}>{certificate.supplier}</td>
      <td style={tableCellStyle}>{certificate.certificateType}</td>
      <td style={tableCellStyle}>{certificate.validFrom}</td>
      <td style={tableCellStyle}>{certificate.validTo}</td>
    </tr>
  );
};

const tableCellStyle = {
  border: '1px solid #dddddd',
  textAlign: 'left',
  padding: '6px',
};

const menuStyle = {
  position: 'absolute',
  border: '1px solid #dddddd',
  textAlign: 'left',
  backgroundColor: 'white',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '18px',
  zIndex: 1,
  width: '80px',
  marginTop: '6px',
  '& span:hover': {
    backgroundColor: '#3f9acf', // Plava boja pozadine na hoveru
    color: 'white', // Bela boja teksta na hoveru
    cursor: 'pointer',
  },
};

export default CertificateItem;
