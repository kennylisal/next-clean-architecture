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
import { useForm } from "react-hook-form";
import { signUpUser } from "./actions";

export default function SignUpPage() {
  // Sign-up form
  const {
    register,
    handleSubmit: handleSignUpSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      user_email: "",
      user_password: "",
      role: "student",
    },
  });

  // Handle sign-up submission
  const onSubmit = async (data: CreateUser) => {
    await signUpUser(data);
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSignUpSubmit(onSubmit)}
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
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            error={!!errors.role}
          >
            <InputLabel>Role</InputLabel>
            <Select {...register("role")} label="Role">
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
            {errors.role && (
              <Typography variant="caption" color="error">
                {errors.role.message}
              </Typography>
            )}
          </FormControl>
          {errors.root && (
            <Typography variant="body2" color="error" align="center">
              {errors.root.message}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            name="tombol"
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
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
