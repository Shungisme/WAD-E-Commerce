import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
  IconButton,
  MenuItem,
  menuItemClasses,
  MenuList,
  Popover,
} from "@mui/material";
import { useCallback, useState } from "react";
import { Label } from "../../components/label/label";
import {
  formatCurrency,
  formatNumber,
  formatShortenNumber,
} from "../../utils/format-number";
import { Iconify } from "../../components/iconify/iconify";
import EditProductDialog from "./edit-product-dialog";
import DeleteProductDialog from "./delete-product-dialog";

export type ProductItemProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  quantity: number;
  status: string;
  discount: number;
  categorySlug: string;
  images: string[];
};

export function ProductItem({ product }: { product: ProductItemProps }) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(
    null
  );

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const renderStatus = (
    <Label
      variant="filled"
      color={(product.status === "inactive" && "error") || "success"}
      sx={{
        zIndex: 9,
        top: 16,
        left: 16,
        position: "absolute",
        textTransform: "uppercase",
      }}
    >
      {product.status}
    </Label>
  );

  const renderDiscount = (
    <Label
      variant="filled"
      color="info"
      sx={{
        zIndex: 9,
        top: 16,
        left: 96,
        position: "absolute",
        textTransform: "uppercase",
      }}
    >
      SALE &nbsp;
      {formatNumber(product.discount / 100, {
        style: "percent",
        maximumFractionDigits: 0,
      })}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.title}
      src={product.thumbnail}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: "cover",
        position: "absolute",
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: "text.disabled",
          textDecoration: "line-through",
        }}
      >
        {formatCurrency(product.price)}
      </Typography>
      &nbsp;
      {product.discount &&
        formatCurrency((product.price * (100 - product.discount)) / 100)}
    </Typography>
  );

  const renderQuantity = (
    <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
      {formatShortenNumber(product.quantity)} in stock
    </Typography>
  );

  return (
    <>
      <Card>
        <Box sx={{ pt: "100%", position: "relative" }}>
          {product.status && renderStatus}
          {product.discount && renderDiscount}

          <Box
            sx={{
              zIndex: 9,
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(0, 0, 0, 0.1)",
              borderRadius: "50%",
            }}
          >
            <IconButton
              onClick={handleOpenPopover}
              sx={{
                color: "common.white",
              }}
            >
              <Iconify
                icon="eva:more-vertical-fill"
                sx={{
                  width: 32,
                  height: 32,
                }}
              />
            </IconButton>
          </Box>

          {renderImg}
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {product.title}
          </Link>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {renderQuantity}
            {renderPrice}
          </Box>
        </Stack>
      </Card>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: {
                bgcolor: "action.selected",
              },
            },
          }}
        >
          <MenuItem onClick={() => setOpenEditDialog(true)}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => setOpenDeleteDialog(true)}
            sx={{ color: "error.main" }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>

      <EditProductDialog
        open={openEditDialog}
        onClose={() => {
          setOpenEditDialog(false);
          handleClosePopover();
        }}
        product={product}
        onSave={() => {}}
      />

      <DeleteProductDialog
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          handleClosePopover();
        }}
        onDelete={() => {}}
        product={product}
      />
    </>
  );
}
