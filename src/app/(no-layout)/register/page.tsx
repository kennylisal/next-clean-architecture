"use client";
import { CreateUser, createUserSchema } from "@/entities/models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit = async (data: CreateUser) => {
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
            Sign Up
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
            label="Full Name"
            variant="outlined"
            margin="normal"
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
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
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Role</InputLabel>
            <Select {...register("role")}>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>

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
            Already have an account?{" "}
            <Link href="/sign-in" underline="hover">
              Sign In
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
