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
import { loginUser } from "./actions";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
    },
  });
  const onSubmit = async (data: LoginUser) => {
    await loginUser(data);
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
            Welcome back, please enter your credentials to sign in.
          </Typography>

          {/* Form Fields */}
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            {...register("user_email")}
            error={!!errors.user_email}
            helperText={errors.user_email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("user_password")}
            error={!!errors.user_password}
            helperText={errors.user_password?.message}
          />

          {/* Root-level Error */}
          {errors.root && (
            <Typography variant="body2" color="error" align="center">
              {errors.root.message}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            name="tombol"
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>

          {/* Footer */}
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don’t have an account?{" "}
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
