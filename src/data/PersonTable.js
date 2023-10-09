import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

function createData(name, fName, id, department, plant) {
  return { name, fName, id, department, plant };
}

const rows = [
  createData("Simon", "Zwolfer", "ZWOELF", "ITM/FP", "096"),
  createData("Wolfgang", "Stark", "WOLFST", "ITM/FP", "094"),
  createData("Amar", "Red", "AMRE", "ITM/FP", "074"),
];

export { rows };

export default function PersonTable({
  rows,
  handleCheckboxChange,
  selectedPersons,
  handleSelectAll,
  selectAll,
}) {
  const toggleSelectAll = () => {
    handleSelectAll(!selectAll); // azurira kad se klikne selectall
  };

  return (
    <div style={{ maxHeight: "350px", overflowY: "auto" }}>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "350px", width: "100%" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  onChange={toggleSelectAll}
                  checked={selectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">User ID</TableCell>
              <TableCell align="left">Department</TableCell>
              <TableCell align="left">Plant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Checkbox
                    onChange={handleCheckboxChange(row.name)}
                    checked={selectedPersons.includes(row.name)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.fName}</TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.department}</TableCell>
                <TableCell align="left">{row.plant}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
