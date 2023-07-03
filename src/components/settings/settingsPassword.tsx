import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "../../services/store";
import { fetchUpdatePassword } from "../../services/store/actions/users";
import { useSnackbar } from "notistack";
import { stopLoading } from "../../services/store/slices/auth";
import { LoadingButton } from "@mui/lab";

const SettingsPassword = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loading } = useSelector((state: any) => state.Auth);

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("A senha é obrigatória."),
    confirm: Yup.string()
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais.")
      .required("A confirmação de senha é obrigatória."),
  });

  const formik = useFormik({
    validationSchema,
    enableReinitialize: true,
    initialValues: {
      password: "",
      confirm: "",
    },
    onSubmit: async (values) => {
      const payload = {
        password: values.password,
      };

      try {
        const response: any = await dispatch(fetchUpdatePassword(payload));

        if (response.meta.requestStatus === "fulfilled") {
          enqueueSnackbar(response.payload.message, { variant: "success" });
        } else {
          enqueueSnackbar(response.payload.message, { variant: "error" });
        }
      } catch (error: any) {
        enqueueSnackbar("Ocorreu um erro", { variant: "error" });
        dispatch(stopLoading());
        console.log(error);
      }
    },
  });

  const { getFieldProps, handleSubmit, errors, touched } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card>
          <CardHeader subheader="Atualizar senha" title="Senha" />
          <Divider />
          <CardContent>
            <TextField
              {...getFieldProps("password")}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              fullWidth
              label="Senha"
              margin="normal"
              type="password"
            />
            <TextField
              {...getFieldProps("confirm")}
              error={Boolean(touched.confirm && errors.confirm)}
              helperText={touched.confirm && errors.confirm}
              fullWidth
              label="Confirmar senha"
              margin="normal"
              name="confirm"
              type="password"
            />
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
              {...{ loading }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Atualizar
            </LoadingButton>
          </Box>
        </Card>
      </Form>
    </FormikProvider>
  );
};

export default SettingsPassword;
