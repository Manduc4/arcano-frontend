import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "../../services/store";
import { Form, FormikProvider, useFormik } from "formik";
import { fetchUpdateUser } from "../../services/store/actions/users";
import { useSnackbar } from "notistack";
import { AuthSliceProps, stopLoading } from "../../services/store/slices/auth";
import { LoadingButton } from "@mui/lab";

const ProfileForm = () => {
  const { user, loading } = useSelector(
    (state: any) => state.Auth as AuthSliceProps
  );
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      firstName: user.name.split(" ")[0] || "",
      lastName: user.name.split(" ")[1] || "",
      email: user.email || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      const payload = {
        id: user.id || 0,
        name: values.firstName + " " + values.lastName || "",
        email: values.email || "",
      };
      try {
        const response: any = await dispatch(fetchUpdateUser(payload));
        if (response.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(response.payload.message, { variant: "success" });
        } else {
          enqueueSnackbar(response.payload.message, { variant: "error" });
        }
      } catch (error: any) {
        dispatch(stopLoading());
        enqueueSnackbar("Ocorreu um erro.", { variant: "error" });
        console.log(error);
      }
    },
  });

  const { getFieldProps, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            subheader="As informações podem ser editadas"
            title="Perfil"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  {...getFieldProps("firstName")}
                  fullWidth
                  label="Primeiro nome"
                  name="firstName"
                  required
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  {...getFieldProps("lastName")}
                  fullWidth
                  label="Último nome"
                  name="lastName"
                  required
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  {...getFieldProps("email")}
                  fullWidth
                  label="Email"
                  name="email"
                  required
                />
              </Grid>
              {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Celular"
                name="phone"
                // onChange={handleChange}
                type="number"
                value={values.phone}
              />
            </Grid> */}
              {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="País"
                name="country"
                // onChange={handleChange}
                required
                value={values.country}
              />
            </Grid> */}
              {/* <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Estado"
                name="state"
                // onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
              >
                {states.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid> */}
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <LoadingButton
              loading={loading}
              color="primary"
              variant="contained"
              type="submit"
            >
              Salvar
            </LoadingButton>
          </Box>
        </Card>
      </Form>
    </FormikProvider>
  );
};

export default ProfileForm;
