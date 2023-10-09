export const getListCertificates = () => {
  if (!localStorage["certificates"]) {
    localStorage["certificates"] = "[]";
  }

  let certificates = localStorage["certificates"];
  certificates = JSON.parse(certificates);
  return certificates;
};

export const addCertificate = (certificate) => {
  const certificates = getListCertificates();
  certificates.push(certificate);
  localStorage["certificates"] = JSON.stringify(certificates);
};

export const removeCertificate = (id) => {
  let certificates = getListCertificates();
  certificates = certificates.filter((certificate) => certificate.id !== id);
  localStorage["certificates"] = JSON.stringify(certificates);
};

export const getCertificateId = (id) => {
  const certificates = getListCertificates();
  const certificate = certificates.find((certificate) => certificate.id === id);
  return certificate;
};

export const editCertificate = (id, newEmployee) => {
  let certificates = getListCertificates();
  certificates = certificates.filter((certificate) => certificate.id !== id);
  certificates.push(newEmployee);
  localStorage["certificates"] = JSON.stringify(certificates);
};

export const removeSupplierValue = (id, setCertificates) => {
  let certificates = getListCertificates();
  const certificateIndex = certificates.findIndex(
    (certificate) => certificate.id === id,
  );

  if (certificateIndex !== -1) {
    //trazimo certifik
    certificates[certificateIndex].supplier = ""; //vrijednost supplier na prazan string
    localStorage["certificates"] = JSON.stringify(certificates);
    // sad za azuriranje stanje unutar Overview 
    if (setCertificates) {
      setCertificates(certificates);
    }
  }
};
