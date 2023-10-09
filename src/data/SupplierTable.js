import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

function createData(name, index, city) {
  return { name, index, city };
}

const rows = [
  createData("ANDEMIS GmbH", 1, "Stuttgart"),
  createData("TechSolutions Corp", 123, "New York"),
  createData("GlobalTrade Enterprises", 456, "Los Angeles"),
  createData("InnoSource Producers", 789, "Chicago"),
  createData("Sunrise Distributors", 234, "Miami"),
  createData("GreenTech Innovations Ltd", 567, "San Francisco"),
  createData("Cupcake", 47, "Tuzla"),
];
export { rows };

export default function SupplierTable({
  rows,
  handleCheckboxChange,
  selectedSuppliers,
  handleSelect,
}) {
  return (
    <div style={{ maxHeight: "350px", overflowY: "auto" }}>
      <TableContainer
        component={Paper}
        style={{ maxHeight: "350px", width: "100%" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>Supplier name</TableCell>
              <TableCell align="left">Supplier index</TableCell>
              <TableCell align="left">City</TableCell>
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
                    onChange={handleCheckboxChange(row.name)} //supplier name
                    checked={selectedSuppliers.includes(row.name)} // provjera jel supplier name u nizu electedSuppliers
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.index}</TableCell>
                <TableCell align="left">{row.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
