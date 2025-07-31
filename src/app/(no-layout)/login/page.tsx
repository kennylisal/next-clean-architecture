"use client";

import { SignUpError } from "@/entities/error/common";
import { LoginUser, loginUserSchema } from "@/entities/models/user";
import { useSignIn } from "@clerk/nextjs";
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
  const { isLoaded, signIn, setActive } = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginUser>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginUser) => {
    if (!isLoaded) {
      setError("root", { message: "Clerk is not loaded" });
      return;
    }

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        alert("Sign-in successful! You are now logged in.");
        // Optionally redirect to a dashboard
        // window.location.href = '/dashboard';
      } else {
        setError("root", { message: "Sign-in failed. Please try again." });
      }
    } catch (error) {
      const message = "Error ketika sign-in";
      throw new SignUpError(message);
    }
  };

  if (!isLoaded) return <Box>Loading...</Box>;

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
