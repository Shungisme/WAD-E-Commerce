import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
  IconButton,
  Typography,
  FormGroup,
  FormHelperText,
  InputAdornment,
  ImageListItem,
  ImageList,
} from "@mui/material";
import { Iconify } from "../../components/iconify/iconify";
import axios from "axios";
import { alpha } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProductItemProps } from "./product-item";

export type AddProductDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (product: Omit<ProductItemProps, "id">) => void;
};

const cloudinaryConfig = {
  cloudName: "dwkunsgly",
  uploadPreset: "WAD-Ecommerce",
};

const validationSchema = new Yup.ObjectSchema({
  title: Yup.string()
    .min(6, "Title must be at least 6 characters")
    .max(255, "Title must be at most 255 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(6, "Description must be at least 6 characters")
    .max(255, "Description must be at most 255 characters")
    .required("Description is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
  price: Yup.number().min(0).required("Price is required"),
  quantity: Yup.number().min(0).required("Quantity is required"),
  discount: Yup.number().min(0).max(100),
  categorySlug: Yup.string().required("Category is required"),
  status: Yup.string()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
  images: Yup.array()
    .of(Yup.mixed())
    .min(1)
    .max(6)
    .required("Images is required"),
});

async function uploadImageCloudinary(file: any) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryConfig.uploadPreset);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
    formData
  );

  return await response.data;
}

export default function AddProductDialog({
  open,
  onClose,
  onCreate,
}: AddProductDialogProps) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      thumbnail: "",
      price: 0,
      quantity: 0,
      discount: 0,
      categorySlug: "",
      status: "active",
      images: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values: Omit<ProductItemProps, "id">) => {
      const images = [];

      for (let i = 0; i < values.images.length; i++) {
        const image = await uploadImageCloudinary(values.images[i]);

        images.push(image.secure_url);
      }

      const thumbnail = await uploadImageCloudinary(values.thumbnail);

      onCreate({
        ...values,
        thumbnail: thumbnail.secure_url,
        images: images,
      });
      onClose();
    },
  });

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        formik.setFieldValue("thumbnail", e.target?.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleImagesChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);

      const readFiles = files.map((file) => {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
      });

      try {
        const images = await Promise.all(readFiles);
        console.log(images);
        formik.setFieldValue("images", images);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 2, pb: 0 }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
          }}
        >
          <Iconify
            icon="ic:outline-drive-file-rename-outline"
            sx={{
              color: "success.main",
              width: 24,
              height: 24,
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: (theme) => theme.typography.h6,
          }}
        >
          Edit Product
        </Typography>
      </DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {formik.values.thumbnail ? (
                <img
                  src={formik.values.thumbnail}
                  alt={formik.values.title}
                  width={64}
                  height={64}
                />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: (theme) => alpha(theme.palette.divider, 0.1),
                    width: 64,
                    height: 64,
                  }}
                >
                  <Iconify icon="mdi:camera" />
                </Avatar>
              )}

              <FormControl
                error={!!formik.errors.thumbnail && formik.touched.thumbnail}
              >
                <IconButton component="label">
                  <input
                    type="file"
                    name="thumbnail"
                    hidden
                    accept="image/*"
                    onChange={handleThumbnailChange}
                  />
                  <Typography>Thumbnail &nbsp;</Typography>
                  <Iconify icon="solar:camera-add-bold" />
                </IconButton>

                {formik.errors.thumbnail && formik.touched.thumbnail && (
                  <FormHelperText>{formik.errors.thumbnail}</FormHelperText>
                )}
              </FormControl>
            </Box>

            <FormControl
              error={!!formik.errors.title && formik.touched.title}
              fullWidth
            >
              <TextField
                name="title"
                fullWidth
                value={formik.values.title}
                label="Title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.errors.title && formik.touched.title && (
                <FormHelperText>{formik.errors.title}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!formik.errors.quantity && formik.touched.quantity}
              sx={{ mb: 3 }}
            >
              <TextField
                name="quantity"
                type="number"
                fullWidth
                value={formik.values.quantity}
                label="Quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="carbon:inventory-management" />
                    </InputAdornment>
                  ),
                }}
              />
              {formik.errors.quantity && formik.touched.quantity && (
                <FormHelperText>{formik.errors.quantity}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!formik.errors.price && formik.touched.price}
              sx={{ mb: 3 }}
            >
              <TextField
                name="price"
                type="number"
                fullWidth
                value={formik.values.price}
                label="Price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
              {formik.errors.price && formik.touched.price && (
                <FormHelperText>{formik.errors.price}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!formik.errors.discount && formik.touched.discount}
              sx={{ mb: 3 }}
            >
              <TextField
                name="discount"
                type="number"
                fullWidth
                value={formik.values.discount}
                label="Discount"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
              />
              {formik.errors.discount && formik.touched.discount && (
                <FormHelperText>{formik.errors.discount}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={
                !!formik.errors.categorySlug && formik.touched.categorySlug
              }
              sx={{ mb: 3 }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                name="categorySlug"
                value={formik.values.categorySlug}
                label="Category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="mdi:category" />
                  </InputAdornment>
                }
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="books">Books</MenuItem>
                {/* Add more categories as needed */}
              </Select>
              {formik.errors.categorySlug && formik.touched.categorySlug && (
                <FormHelperText>{formik.errors.categorySlug}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!formik.errors.status && formik.touched.status}
            >
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formik.values.status}
                label="Status"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{
                  color:
                    formik.values.status === "active"
                      ? "success.light"
                      : "error.light",
                }}
                startAdornment={
                  <>
                    <Iconify
                      icon={
                        formik.values.status === "active"
                          ? "nrk:checkbox-active"
                          : "mdi:close-box"
                      }
                    />
                    &nbsp;
                  </>
                }
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>

              {formik.errors.status && formik.touched.status && (
                <FormHelperText>{formik.errors.status}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!formik.errors.description && formik.touched.description}
              sx={{ mb: 3 }}
            >
              <TextField
                name="description"
                multiline
                rows={4}
                fullWidth
                value={formik.values.description}
                label="Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <FormHelperText>{formik.errors.description}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={formik.touched.images && !!formik.errors.images}
              sx={{ mb: 3 }}
            >
              <InputLabel shrink>Product Images</InputLabel>

              <Box sx={{ mt: 2 }}>
                <IconButton component="label">
                  <input
                    name="images"
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleImagesChange}
                  />
                  <Iconify icon="solar:camera-add-bold" />
                </IconButton>
              </Box>

              <ImageList
                sx={{
                  width: "100%",
                  height: "auto",
                  mt: 2,
                  borderRadius: 1,
                  border: (theme) => `1px dashed ${theme.palette.divider}`,
                }}
                cols={3}
                gap={8}
              >
                {formik.values.images?.map((img, index) => (
                  <ImageListItem
                    key={index}
                    sx={{
                      position: "relative",
                      "&:hover .delete-button": {
                        opacity: 1,
                      },
                    }}
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      width={32}
                      height={32}
                    />
                    <IconButton
                      className="delete-button"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        opacity: 0,
                        transition: "opacity 0.2s",
                        bgcolor: (theme) =>
                          alpha(theme.palette.background.paper, 0.8),
                        "&:hover": {
                          bgcolor: (theme) =>
                            alpha(theme.palette.background.paper, 0.95),
                        },
                      }}
                      onClick={() => {
                        const newImages = formik.values.images.filter(
                          (_, i) => i !== index
                        );
                        formik.setFieldValue("images", newImages);
                      }}
                    >
                      <Iconify icon="eva:close-fill" />
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>

              {formik.errors.images && formik.touched.images && (
                <FormHelperText>{formik.errors.images}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" type="submit">
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
