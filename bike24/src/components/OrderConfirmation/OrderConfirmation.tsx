import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { UUID } from "crypto";
import { OrderConfirmationInfos } from "@/types/order-confirmation-infos";

interface ProductInfos {
  id?: UUID;
  productName?: string;
  price?: number;
  desiredQuantity?: number;
  totalPrice?: number;
}

function createData(
  id?: UUID,
  productName?: string,
  price?: number,
  desiredQuantity?: number,
  totalPrice?: number
): ProductInfos {
  return { id, productName, price, desiredQuantity, totalPrice };
}

export default function OrderConfirmation({
  selectedProducts,
  totalPrice,
  date,
  orderReference,
}: OrderConfirmationInfos) {
  const [rows, setRows] = useState<ProductInfos[] | []>([]);

  useEffect(() => {
    if (selectedProducts?.length > 0) {
      const rows = selectedProducts.map((product) => {
        return createData(
          product.id,
          product.productName,
          product.price,
          product.desiredQuantity,
          product.totalPrice
        );
      });
      setRows(rows);
    }
  }, [selectedProducts]);
  return (
    <div className="flex flex-col pt-20 justify-center items-center md:max-w-5xl">
      <h1 className="font-bold text-2xl md:text-5xl">
        Order #{orderReference} Confirmed!
      </h1>
      <CheckCircleIcon
        className="text-green-500"
        sx={{ fontSize: 200 }}
      ></CheckCircleIcon>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.productName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.productName}</TableCell>
                <TableCell align="right">{row.desiredQuantity}</TableCell>
                <TableCell align="right">{`${row.price} €`}</TableCell>
                <TableCell align="right">{`${row.totalPrice} €`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex self-end bg-gray-500 text-white p-4 rounded-md my-4">
        Total Order Price: {`${totalPrice} €`}
      </div>
    </div>
  );
}
