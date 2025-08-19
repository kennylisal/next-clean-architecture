"use server";

import LoginPage from "./login";

export default async function Page() {
  return <LoginPage />;
}
// const res = await service.signUpEmail("kenny@gmail.com", "ipshield21");

// "use client";
// import { SignUpError } from "@/entities/error/common";
// import { LoginUser, loginUserSchema } from "@/entities/models/user";
// import { url_route } from "@/utils/route";
// import { useSignIn } from "@clerk/nextjs";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Box,
//   Button,
//   Container,
//   Link,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useRouter } from "next/navigation";

// import { useForm } from "react-hook-form";
// import { loginSuccess } from "./action";

// export default function LoginPage() {
//   const router = useRouter();
//   const { isLoaded, signIn, setActive } = useSignIn();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setError,
//   } = useForm<LoginUser>({
//     resolver: zodResolver(loginUserSchema),
//     defaultValues: {
//       user_email: "",
//       user_password: "",
//     },
//   });

//   const onSubmit = async (data: LoginUser) => {
//     if (!isLoaded) {
//       setError("root", { message: "Clerk is not loaded" });
//       return;
//     }

//     try {
//       const result = await signIn.create({
//         identifier: data.user_email,
//         password: data.user_password,
//       });

//       if (result.status === "complete") {
//         await setActive({ session: result.createdSessionId });
//         // window.location.href = url_route.posts;
//         await loginSuccess();
//       } else {
//         setError("root", { message: "Sign-in failed. Please try again." });
//       }
//     } catch (error) {
//       const message =
//         error instanceof Error ? error.message : "Error ketika sign-in";
//       throw new SignUpError(message);
//     }
//   };

//   if (!isLoaded)
//     return (
//       <Box>
//         <h2>Loading...</h2>
//       </Box>
//     );

//   return (
//     <Box className="min-h-screen flex items-center justify-center bg-gray-100">
//       <Container maxWidth="sm">
//         <Box
//           component="form"
//           onSubmit={handleSubmit(onSubmit)}
//           sx={{
//             bgcolor: "white",
//             boxShadow: 3,
//             borderRadius: 2,
//             p: 4,
//             mt: 8,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           {/* Header */}
//           <Typography variant="h4" component="h1" align="center" gutterBottom>
//             Sign In
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             align="center"
//             color="text.secondary"
//             gutterBottom
//           >
//             Welcome back, please enter your credentials to sign in.
//           </Typography>

//           {/* Form Fields */}
//           <TextField
//             fullWidth
//             label="Email"
//             type="email"
//             variant="outlined"
//             margin="normal"
//             {...register("user_email")}
//             error={!!errors.user_email}
//             helperText={errors.user_email?.message}
//           />
//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             variant="outlined"
//             margin="normal"
//             {...register("user_password")}
//             error={!!errors.user_password}
//             helperText={errors.user_password?.message}
//           />

//           {/* Root-level Error */}
//           {errors.root && (
//             <Typography variant="body2" color="error" align="center">
//               {errors.root.message}
//             </Typography>
//           )}

//           {/* Submit Button */}
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             type="submit"
//             name="tombol"
//             disabled={isSubmitting}
//             sx={{ mt: 2 }}
//           >
//             {isSubmitting ? "Signing In..." : "Sign In"}
//           </Button>

//           {/* Footer */}
//           <Typography variant="body2" align="center" sx={{ mt: 2 }}>
//             Don’t have an account?{" "}
//             <Link href="/sign-up" underline="hover">
//               Sign Up
//             </Link>
//           </Typography>
//           <Typography
//             variant="caption"
//             align="center"
//             color="text.secondary"
//             sx={{ mt: 1 }}
//           >
//             Powered by Clerk
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// }
