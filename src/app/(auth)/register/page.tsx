"use client";

import { SignUpError } from "@/entities/error/common";
import { CreateUser, createUserSchema } from "@/entities/models/user";
import { useSignUp } from "@clerk/nextjs";
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
import { z } from "zod";
import { useState } from "react";

// Zod schema for verification code
const VerificationSchema = z.object({
  code: z.string().min(6, "Verification code must be 6 digits"),
});

type VerificationFormData = z.infer<typeof VerificationSchema>;

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );
  // Sign-up form
  const {
    register,
    handleSubmit: handleSignUpSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  // Verification form
  const {
    register: registerVerification,
    handleSubmit: handleVerificationSubmit,
    formState: {
      errors: verificationErrors,
      isSubmitting: isVerificationSubmitting,
    },
  } = useForm<VerificationFormData>({
    resolver: zodResolver(VerificationSchema),
  });

  // Handle sign-up submission
  const onSubmit = async (data: CreateUser) => {
    if (!isLoaded) {
      setError("root", { message: "Clerk is not loaded" });
      return;
    }

    try {
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.update({
        unsafeMetadata: {
          role: data.role,
          createdAt: new Date().toISOString(),
        },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsVerificationStep(false); // Switch to verification step
      setVerificationError(null);
    } catch (error) {
      const message = "Error ketika signup";
      throw new SignUpError(message);
    }
  };

  // Handle verification code submission
  const onVerify = async (data: VerificationFormData) => {
    if (!isLoaded) {
      setVerificationError("Clerk is not loaded");
      return;
    }

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: data.code,
      });

      if (result.status === "complete") {
        // Set the session as active to log the user in
        await setActive({ session: result.createdSessionId });
        alert("Email verified successfully! You are now signed in.");
        // Optionally redirect to a dashboard
        // window.location.href = '/dashboard';
      } else {
        setVerificationError("Verification failed. Please try again.");
      }
    } catch (error) {
      const message = "Invalid or expired verification code";
      throw new SignUpError(message);
    }
  };

  if (!isLoaded)
    return (
      <Box>
        <h2>Loading...</h2>
      </Box>
    );

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="sm">
        {isVerificationStep ? (
          <Box
            component="form"
            onSubmit={handleVerificationSubmit(onVerify)}
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
              Verify Your Email
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              gutterBottom
            >
              Enter the verification code sent to your email.
            </Typography>
            <TextField
              fullWidth
              label="Verification Code"
              variant="outlined"
              margin="normal"
              {...registerVerification("code")}
              error={!!verificationErrors.code}
              helperText={verificationErrors.code?.message}
            />
            {verificationError && (
              <Typography variant="body2" color="error" align="center">
                {verificationError}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={isVerificationSubmitting}
              sx={{ mt: 2 }}
            >
              {isVerificationSubmitting ? "Verifying..." : "Verify Code"}
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              <Button
                onClick={() => {
                  setVerificationError(null);
                  setIsVerificationStep(false);
                }}
                sx={{ textTransform: "none" }}
              >
                Back to Sign Up
              </Button>
            </Typography>
          </Box>
        ) : (
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
        )}
      </Container>
    </Box>
  );
}
