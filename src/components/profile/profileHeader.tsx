import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import { useSelector } from "../../services/store";
import { Form, FormikProvider, useFormik } from "formik";

const userMock = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Sinop",
  country: "BRA",
  jobTitle: "Developer",
  name: "Caio Manduca",
  timezone: "GTM-7",
};

const ProfileHeader = () => {
  const user = useSelector((state: any) => state.Auth.user);



  return (

        <Card>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar
                src=""
                sx={{
                  height: 64,
                  mb: 2,
                  width: 64,
                }}
              />
              <Typography color="textPrimary" gutterBottom variant="h5">
                {user.name}
              </Typography>
              {/* <Typography color="textSecondary" variant="body2">
            {`${user.city} ${user.country}`}
          </Typography> */}
              {/* <Typography color="textSecondary" variant="body2">
            {user.timezone}
          </Typography> */}
            </Box>
          </CardContent>
          <Divider />
          <CardActions>
            <Button disabled color="primary" fullWidth variant="text">
              Carregar imagem de Perfil
            </Button>
          </CardActions>
        </Card>

  );
};

export default ProfileHeader;
