// "use client";

// import { useActionState, useState } from "react";
// import {
//   Container,
//   Paper,
//   Stack,
//   Button,
//   FormControl,
//   TextField,
//   Typography,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   Switch,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Grid,
// } from "@mui/material";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { experimental_useFormStatus as useFormStatus } from "react-dom";

// // Mock components and types (replace with your actual implementations)
// interface Category {
//   id: number;
//   name: string;
// }
// const categories: Category[] = [
//   { id: 1, name: "Tech" },
//   { id: 2, name: "Lifestyle" },
// ];
// const RichTextEditor = ({
//   value,
//   onChange,
//   placeholder,
// }: {
//   value: string;
//   onChange: (value: string) => void;
//   placeholder: string;
// }) => (
//   <TextField
//     multiline
//     rows={4}
//     value={value}
//     onChange={(e) => onChange(e.target.value)}
//     placeholder={placeholder}
//     fullWidth
//   />
// );

// // Mock PageHeader (replace with your actual component)
// const PageHeader = ({
//   title,
//   breadcrumbs,
//   renderRight,
// }: {
//   title: string;
//   breadcrumbs: string[];
//   renderRight: React.ReactNode;
// }) => (
//   <div className="mb-4">
//     <h1 className="text-2xl font-bold">{title}</h1>
//     <div className="text-sm">{breadcrumbs.join(" / ")}</div>
//     <div className="flex justify-end">{renderRight}</div>
//   </div>
// );

// // Form data type
// interface FormData {
//   title: string;
//   description: string;
//   content: string;
//   isPublic: boolean;
//   pinToTop: boolean;
//   waitForReview: boolean;
//   selectedCategories: number[];
// }

// // Server action
// async function createPostAction(
//   prevState: { errors?: Record<string, string> } | null,
//   formData: FormData
// ): Promise<{ errors?: Record<string, string> }> {
//   // Simulate validation
//   const errors: Record<string, string> = {};
//   if (!formData.title.trim()) {
//     errors.title = "Title is required";
//   }
//   if (!formData.description.trim()) {
//     errors.description = "Description is required";
//   }
//   if (!formData.content.trim()) {
//     errors.content = "Content is required";
//   }
//   if (Object.keys(errors).length > 0) {
//     return { errors };
//   }

//   // Simulate API call
//   console.log("Submitting post:", formData);
//   // Replace with your actual API call (e.g., to your createPost use case)
//   // await postRepo.createPost({ ...formData, ... });

//   return { errors: undefined };
// }
// //  return { error: z.treeifyError(result.error).properties };
// export default function CreatePostForm() {
//   // Form state for controlled inputs
//   const [formState, setFormState] = useState<FormData>({
//     title: "",
//     description: "",
//     content: "",
//     isPublic: false,
//     pinToTop: false,
//     waitForReview: false,
//     selectedCategories: [],
//   });

//   // useActionState for form submission
//   const [state, formAction] = useActionState(createPostAction, null);

//   // Handle input changes
//   const handleInputChange = (
//     field: keyof FormData,
//     value: string | boolean | number[]
//   ) => {
//     setFormState((prev) => ({ ...prev, [field]: value }));
//   };

//   // Handle category checkbox toggle
//   const handleCategoryToggle = (categoryId: number) => {
//     setFormState((prev) => {
//       const selectedCategories = prev.selectedCategories.includes(categoryId)
//         ? prev.selectedCategories.filter((id) => id !== categoryId)
//         : [...prev.selectedCategories, categoryId];
//       return { ...prev, selectedCategories };
//     });
//   };

//   // Generate categories list
//   const categoriesList = categories.map((category) => (
//     <FormGroup key={category.id} aria-label="position" row>
//       <FormControlLabel
//         control={
//           <Checkbox
//             checked={formState.selectedCategories.includes(category.id)}
//             onChange={() => handleCategoryToggle(category.id)}
//           />
//         }
//         label={category.name}
//       />
//     </FormGroup>
//   ));

//   // Form status for pending state
//   const { pending } = useFormStatus();

//   return (
//     <Container maxWidth="xl" className="py-6">
//       <PageHeader
//         title="Create post"
//         breadcrumbs={["Blog", "Create post"]}
//         renderRight={
//           <Stack direction="row" justifyContent="flex-end" spacing={2}>
//             <Button variant="outlined" disabled={pending}>
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               form="create-post-form"
//               variant="contained"
//               disabled={pending}
//             >
//               {pending ? "Publishing..." : "Publish"}
//             </Button>
//           </Stack>
//         }
//       />

//       <form id="create-post-form" action={formAction} className="mt-6">
//         {/* Hidden inputs to pass all form data */}
//         <input type="hidden" name="title" value={formState.title} />
//         <input type="hidden" name="description" value={formState.description} />
//         <input type="hidden" name="content" value={formState.content} />
//         <input
//           type="hidden"
//           name="isPublic"
//           value={String(formState.isPublic)}
//         />
//         <input
//           type="hidden"
//           name="pinToTop"
//           value={String(formState.pinToTop)}
//         />
//         <input
//           type="hidden"
//           name="waitForReview"
//           value={String(formState.waitForReview)}
//         />
//         <input
//           type="hidden"
//           name="selectedCategories"
//           value={JSON.stringify(formState.selectedCategories)}
//         />

//         <Grid container spacing={2}>
//           <Grid item xs={8}>
//             <Paper sx={{ padding: 4 }}>
//               <Stack spacing={2}>
//                 <FormControl fullWidth>
//                   <TextField
//                     label="Post title"
//                     value={formState.title}
//                     onChange={(e) =>
//                       handleInputChange(e.target.name, e.target.value)
//                     }
//                     error={!!state?.errors?.title}
//                     disabled={pending}
//                   />
//                   {state?.errors?.title && (
//                     <Typography color="error">{state.errors.title}</Typography>
//                   )}
//                 </FormControl>

//                 <FormControl fullWidth>
//                   <TextField
//                     label="Post description"
//                     multiline
//                     value={formState.description}
//                     onChange={(e) =>
//                       handleInputChange("description", e.target.value)
//                     }
//                     error={!!state?.errors?.description}
//                     disabled={pending}
//                   />
//                   {state?.errors?.description && (
//                     <Typography color="error">
//                       {state.errors.description}
//                     </Typography>
//                   )}
//                 </FormControl>

//                 <RichTextEditor
//                   value={formState.content}
//                   onChange={(value) => handleInputChange("content", value)}
//                   placeholder="Post content"
//                 />
//                 {state?.errors?.content && (
//                   <Typography color="error">{state.errors.content}</Typography>
//                 )}
//               </Stack>
//             </Paper>
//           </Grid>
//           <Grid item xs={4}>
//             <Accordion defaultExpanded>
//               <AccordionSummary
//                 expandIcon={<ExpandMore />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//               >
//                 <Typography>General</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Stack spacing={2} justifyContent="flex-start">
//                   <FormControl component="fieldset">
//                     <FormGroup aria-label="position" row>
//                       <FormControlLabel
//                         control={
//                           <Switch
//                             checked={formState.isPublic}
//                             onChange={(e) =>
//                               handleInputChange("isPublic", e.target.checked)
//                             }
//                             disabled={pending}
//                           />
//                         }
//                         label="Public post"
//                       />
//                     </FormGroup>
//                     <FormGroup aria-label="position" row>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={formState.pinToTop}
//                             onChange={(e) =>
//                               handleInputChange("pinToTop", e.target.checked)
//                             }
//                             disabled={pending}
//                           />
//                         }
//                         label="Pin to the top"
//                       />
//                     </FormGroup>
//                     <FormGroup aria-label="position" row>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={formState.waitForReview}
//                             onChange={(e) =>
//                               handleInputChange(
//                                 "waitForReview",
//                                 e.target.checked
//                               )
//                             }
//                             disabled={pending}
//                           />
//                         }
//                         label="Waiting for the review"
//                       />
//                     </FormGroup>
//                   </FormControl>
//                 </Stack>
//               </AccordionDetails>
//             </Accordion>
//             <Accordion>
//               <AccordionSummary
//                 expandIcon={<ExpandMore />}
//                 aria-controls="panel2a-content"
//                 id="panel2a-header"
//               >
//                 <Typography>Categories</Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Stack spacing={2}>
//                   <TextField
//                     placeholder="Search categories"
//                     size="small"
//                     disabled={pending}
//                   />
//                   <Stack>{categoriesList}</Stack>
//                 </Stack>
//               </AccordionDetails>
//             </Accordion>
//           </Grid>
//         </Grid>
//       </form>
//     </Container>
//   );
// }
