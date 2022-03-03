import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Container,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import productService from "../../services/product.services";
import uploadService from "../../services/upload.service";
import MenuList from "../menuList/MenuList";
import("./CreateMenu.css");

const CreateMenu = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const { user } = useContext(AuthContext);

  console.log("user is logged", isLoggedIn, user._id);

  const [productData, setproductData] = useState({
    name: "",
    price: "",
    category: "",
    allergens: "",
    restaurantId: user._id,
    imageUrl: "",
  });

  const [loadingImage, setLoadingImage] = useState(false);

  const { name, price, category, allergens, restaurantId, imageUrl } =
    productData;

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    console.log(name);
    console.log(value);

    setproductData({
      ...productData,
      [name]: value,
    });
  };

  let isUpdated = false;
  const isProductUpdated = () => {
    if (isUpdated === false) {
      isUpdated = true;
    } else {
      isUpdated = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isProductUpdated();
    productService
      .saveProduct(productData)
      .then(({ data }) => {})

      .catch((err) => console.log(err));
  };

  const uploadProductImage = (e) => {
    setLoadingImage(true);

    const uploadData = new FormData();
    uploadData.append("imageData", e.target.files[0]);

    uploadService
      .uploadImage(uploadData)
      .then(({ data }) => {
        setLoadingImage(false);
        setproductData({ ...productData, imageUrl: data.cloudinary_url });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="sm">
      <MenuList isUpdated={isUpdated}></MenuList>

      <h4>Nuevo producto </h4>

      <Form onSubmit={handleSubmit}>
        <TextField
          className="textField"
          required
          className="outlined-required"
          label="Nombre del producto"
          name="name"
          type="text"
          value={name}
          onChange={handleInputChange}
        />
        <TextField
          className="textField"
          required
          className="outlined-required"
          label="Precio"
          name="price"
          type="number"
          value={price}
          onChange={handleInputChange}
        />

        <TextField
          className="uploadFile"
          className="outlined-required"
          label="Imagen"
          name="restaurantId"
          type="file"
          onChange={uploadProductImage}
        />

        <InputLabel id="categorySelect">Categoria</InputLabel>
        <Select
          size="small"
          labelId="categorySelect"
          id="categorySelect"
          name="category"
          value={category}
          label="category"
          onChange={handleInputChange}
        >
          <MenuItem value={"comida"}>Comida</MenuItem>
          <MenuItem value={"bebida"}>Bebida</MenuItem>
        </Select>

        <InputLabel id="categorySelect">Alérgenos</InputLabel>

        <Select
          size="small"
          labelId="allegensSelect"
          id="allegensSelect"
          name="allergens"
          value={allergens}
          label="allergens"
          onChange={handleInputChange}
        >
          <MenuItem value={"frutos secos"}>Frutos Secos</MenuItem>
          <MenuItem value={"pescado"}>Pescado</MenuItem>
          <MenuItem value={"cruzcampo"}>Cruz-Campo</MenuItem>
        </Select>

        <Button
          variant="outlined"
          size="small"
          type="submit"
          disabled={loadingImage}
        >
          {loadingImage ? "Espere..." : "Añadir producto"}
        </Button>
      </Form>
    </Container>
  );
};

export default CreateMenu;
