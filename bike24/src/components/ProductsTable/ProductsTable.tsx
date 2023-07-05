import * as React from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

import { UUID } from "crypto";
import RemoveOrAddButtons from "../RemoveOrAddButtons/RemoveOrAddButtons";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmCart from "../ConfirmCart/ConfirmCart";

interface ProductsOverviewProps {
  products: {
    id: UUID;
    name: string;
    quantity: number;
    totalPrice?: number;
    unitPrice: number;
    taxRate?: number | undefined;
    maxQuantity: number;
  }[];
}

export default function DataTable({ products }: ProductsOverviewProps) {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product Name",
      sortable: false,
      type: "string",
      width: 250,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "component",
      headerName: "Quantity",
      renderCell: (params) => (
        <RemoveOrAddButtons
          quantity={params.row.quantity}
          maxQuantity={params.row.maxQuantity}
          onQuantityChange={(newQuantity) =>
            handleQuantityChange(params.row.id, newQuantity)
          }
        />
      ),
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 150,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      type: "number",
      sortable: false,
      width: 130,
      valueFormatter: (params) => {
        return `${params.value} €`;
      },
      headerAlign: "right",
      align: "right",
    },

    {
      field: "totalPrice",
      headerName: "Total Price",
      type: "number",
      sortable: false,
      headerAlign: "right",
      align: "right",
      width: 100,
      valueFormatter: (params) => {
        const formattedValue = Number(params.value).toFixed(2);
        return `${formattedValue} €`;
      },
    },
  ];

  const [allProducts, setAllProducts] = React.useState<
    ProductsOverviewProps["products"]
  >([]);

  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [allRowsSelected, setAllRowsSelected] = React.useState<boolean>(false);
  const [totalPrice, setTotalPrice] = React.useState<string>("0");

  React.useEffect(() => {
    const updatedProducts = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        quantity: product.quantity,
        totalPrice: (product.unitPrice as number) * product.quantity,
        unitPrice: product.unitPrice,
        taxRate: product.taxRate,
        maxQuantity: product.maxQuantity,
      };
    });
    setAllProducts(updatedProducts);

    const totalPrice = updatedProducts.reduce(
      (accumulator, product) => accumulator + product.totalPrice,
      0
    );

    setTotalPrice(totalPrice.toFixed(2));
  }, [products, allProducts]);

  React.useEffect(() => {
    setAllRowsSelected(products.length === selectedRows.length);
  }, [products.length, selectedRows.length]);

  const handleSelectionModelChange = (newSelection: GridRowId[]): void => {
    setSelectedRows(newSelection as string[]);
  };

  const handleDeleteRows = (): void => {
    if (allRowsSelected) {
      setAllProducts([]);
    } else if (selectedRows.length > 0) {
      const updatedProducts = allProducts.filter(
        (product) => !selectedRows.includes(product.id)
      );
      setAllProducts(updatedProducts);
    }
  };

  const handleQuantityChange = (productId: UUID, newQuantity: number): void => {
    const updatedProducts = allProducts.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setAllProducts(updatedProducts);
  };

  return (
    <div className="space-y-3" style={{ height: "100%", width: "100%" }}>
      <IconButton onClick={handleDeleteRows}>
        <DeleteIcon />
      </IconButton>
      <DataGrid
        rows={allProducts}
        columns={columns}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleSelectionModelChange}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick={true}
        disableColumnMenu={true}
      />
      <ConfirmCart totalPrice={totalPrice} />
    </div>
  );
}
