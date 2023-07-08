import * as React from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { SelectedProduct } from "@/types/selected-product.type";
import { UUID } from "crypto";
import RemoveOrAddButtons from "../RemoveOrAddButtons/RemoveOrAddButtons";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface ProductsOverviewProps {
  products: SelectedProduct[];
  onDeleteRows: (products: SelectedProduct[] | []) => void;
  onQuantityUpdate: (products: SelectedProduct[]) => void;
}

export default function ProductsTable({
  products,
  onDeleteRows,
  onQuantityUpdate,
}: ProductsOverviewProps) {
  const columns: GridColDef[] = [
    {
      field: "productName",
      headerName: "Product Name",
      sortable: false,
      type: "string",
      width: 300,
      headerAlign: "right",
      align: "right",
    },
    {
      field: "desiredQuantity",
      headerName: "Quantity",
      renderCell: (params) => (
        <RemoveOrAddButtons
          quantity={params.row.desiredQuantity}
          maxQuantity={params.row.maxAmount}
          onQuantityChange={(newQuantity) =>
            handleQuantityChange(params.row.id, newQuantity)
          }
        />
      ),
      align: "center",
      headerAlign: "center",
      sortable: false,
      width: 200,
    },
    {
      field: "price",
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
      width: 200,
      valueFormatter: (params) => {
        return `${parseFloat(params.value.toFixed(2))} €`;
      },
    },
  ];

  const [allProducts, setAllProducts] = React.useState<SelectedProduct[]>([]);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [allRowsSelected, setAllRowsSelected] = React.useState<boolean>(false);

  const getRowId = (row: SelectedProduct) => row.id;

  React.useEffect(() => {
    const updatedProducts = products.map((item) => {
      console.log("item", item);
      return {
        id: item.id,
        productName: item.productName,
        price: item.price,
        taxRate: item.taxRate,
        maxAmount: item.maxAmount,
        desiredQuantity: item.desiredQuantity,
        totalPrice: item.price * item.desiredQuantity,
      };
    });
    setAllProducts(updatedProducts);
  }, [products]);

  React.useEffect(() => {
    setAllRowsSelected(products.length === selectedRows.length);
  }, [products.length, selectedRows.length]);

  const handleSelectionModelChange = (newSelection: GridRowId[]): void => {
    setSelectedRows(newSelection as string[]);
  };

  const handleDeleteRows = (): void => {
    if (allRowsSelected) {
      setAllProducts([]);
      onDeleteRows([]);
    } else if (selectedRows.length > 0) {
      const updatedProducts = allProducts.filter(
        (item) => !selectedRows.includes(item.id)
      );
      setAllProducts(updatedProducts);
      onDeleteRows(updatedProducts);
    }
  };

  const handleQuantityChange = (productId: UUID, newQuantity: number): void => {
    const updatedProducts = allProducts.map((item) => {
      if (item.id === productId) {
        const totalPrice = item.price * newQuantity;
        return { ...item, desiredQuantity: newQuantity, totalPrice };
      }
      return item;
    });

    const filteredProducts = updatedProducts.filter(
      (item) => item.desiredQuantity > 0
    );

    setAllProducts(filteredProducts);
    onQuantityUpdate(filteredProducts);
  };

  return (
    <div className="space-y-3" style={{ height: "100%", width: "100%" }}>
      {allProducts.length === 0 && (
        <div>
          You have no products in your cart yet, select some from the dropdown
          list
        </div>
      )}

      <IconButton
        disabled={selectedRows.length <= 0}
        onClick={handleDeleteRows}
      >
        <DeleteIcon />
      </IconButton>
      <DataGrid
        rows={allProducts}
        getRowId={getRowId}
        columns={columns}
        rowHeight={85}
        rowSelectionModel={selectedRows}
        onRowSelectionModelChange={handleSelectionModelChange}
        initialState={{
          pagination: {
            paginationModel: { page: 2, pageSize: 5 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick={true}
        disableColumnMenu={true}
      />
    </div>
  );
}
