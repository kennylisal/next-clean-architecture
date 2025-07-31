"use client";
import { CreateUser } from "@/entities/models/user";
import { SignIn, useSignUp } from "@clerk/nextjs";
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

export default function LoginPage() {
  const basicFormData: CreateUser = {
    email: "",
    fullName: "",
    password: "",
    role: "student",
  };
  const [formData, setFormData] = useState(basicFormData);
  const { isLoaded, signUp } = useSignUp();
  const [role, setRole] = useState<string>("student");
  const handleRoleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRole(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = async (data: CreateUser) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
      });

      await signUp.prepareEmailAddressVerification;
    } catch (error) {}
  };
  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="sm">
        <Box
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
            name="fullName"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            name="email"
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="password"
            onChange={handleInputChange}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={handleRoleChange} label="Role">
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
            onClick={() =>
              alert(`Sign Up Submitted! Role: ${role || "Not selected"}`)
            }
          >
            Sign Up
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
