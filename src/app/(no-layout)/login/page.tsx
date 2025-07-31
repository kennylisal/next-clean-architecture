"use client";
import { LoginUser, loginUserSchema } from "@/entities/models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginUser) => {
    console.log(data);
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            bgcolor: "white",
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
            mt: 8,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Header */}
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Sign In
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            Welcome, please fill in your details to create an account.
          </Typography>

          {/* Form Fields */}

          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>

          {/* Footer */}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Dont have an account?{" "}
            <Link href="/sign-up" underline="hover">
              Sign Up
            </Link>
          </Typography>
          <Typography
            variant="caption"
            align="center"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Powered by Clerk
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// const processSignIn = async (data: CreateUser) => {
//   if (!isLoaded) return;
//   try {
//     await signUp.create({
//       emailAddress: formData.email,
//       password: formData.password,
//     });

//     await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

//     await signUp.update({
//       unsafeMetadata: {
//         fullName: data.fullName,
//         role: data.role,
//       },
//     });
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new SignUpError(error.message);
//     } else {
//       throw new UnexpectedError("Terjadi Error unexpected");
//     }
//   }
// };
