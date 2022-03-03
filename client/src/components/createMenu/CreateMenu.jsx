import {
  InputLabel,
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import FormMenu from "../formMenu/FormMenu";

import("./CreateMenu.css");

const CreateMenu = () => {
  return (
    <Container maxWidth="sm">
      <FormMenu></FormMenu>
    </Container>
  );
};

export default CreateMenu;
