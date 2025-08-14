"use client";
import React, { useEffect, useState } from "react";
import JobsList from "@/components/pages/jobs/jobs-list/JobsListPage";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  List,
  Pagination,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { PostHeader } from "@/entities/models/post";
import { PageHeader } from "@/components/page-header/PageHeader";
import { JobsSearch } from "@/components/widget/jobs/jobs-search/JobsSearch";
import { PostAdd } from "@mui/icons-material";
import { LoadingSpinner } from "@/components/loading/loadingSpinner";

export default function Home() {
  // const itemPerPage = 10;
  // const [page, setPage] = useState(1);
  // const [displayedData, setDisplayedData] = useState<PostHeader[]>([]);
  // const [totalData, setTotalData] = useState(0);

  // useEffect(() => {
  //   const res = async () => {
  //     try {
  //       const query = await getPostsDashboard({
  //         page: page,
  //         itemPerPage: itemPerPage,
  //       });
  //       setDisplayedData(query!.data);
  //       if (totalData === 0) setTotalData(query.totalItem);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   res();
  // }, [page]);

  // const CardWrapper = styled(Card)(({ theme }) => ({
  //   marginBottom: 10,
  //   cursor: "pointer",
  //   transition: theme.transitions.create(["box-shadow", "background-color"], {
  //     duration: theme.transitions.duration.shorter,
  //   }),
  //   "&:hover": {
  //     boxShadow: theme.shadows[15],
  //     backgroundColor: theme.palette.grey[50],
  //   },
  // }));

  // const jobsTagsList = ({ tags }: { tags: string[] }) => {
  //   return tags.map((tag, index) => (
  //     <Chip
  //       key={`${tag}_${index}`}
  //       label={tag}
  //       size={"small"}
  //       variant={"filled"}
  //     />
  //   ));
  // };

  // const handlePagination = (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ) => {
  //   setPage(value);
  // };

  // function ContentHandler() {
  //   if (totalData === 0) {
  //     return <LoadingSpinner />;
  //   } else {
  //     return (
  //       <>
  //         <List sx={{ marginTop: 2 }}>
  //           {displayedData.map((data) => (
  //             <CardWrapper key={`${data.title}-${data.author}`}>
  //               <CardContent>
  //                 <Stack direction={"row"} justifyContent={"space-between"}>
  //                   <Stack>
  //                     <Typography variant="h6" component={"h2"}>
  //                       {data.title}
  //                     </Typography>
  //                     <Typography variant="subtitle1" component={"h3"}>
  //                       {data.author} - {"Sekolah"}
  //                     </Typography>
  //                   </Stack>
  //                   <Typography
  //                     fontWeight={"fontWeightMedium"}
  //                     variant="subtitle1"
  //                   >
  //                     {"Seluruh Siswa"}
  //                   </Typography>
  //                 </Stack>
  //                 <Stack mt={1} direction={"row"} spacing={1}>
  //                   {jobsTagsList({
  //                     tags: ["siswa", "pendidikan semester", "SKS"],
  //                   })}
  //                 </Stack>
  //               </CardContent>
  //             </CardWrapper>
  //           ))}
  //         </List>
  //         <Stack alignItems={"center"}>
  //           <Pagination
  //             count={Math.ceil(totalData / itemPerPage)}
  //             variant="outlined"
  //             shape="rounded"
  //             onChange={handlePagination}
  //           />
  //         </Stack>
  //       </>
  //     );
  //   }
  // }

  return (
    <Container maxWidth={"lg"}>
      <h1>Posts</h1>
      {/* <PageHeader
        title={"Jobs"}
        breadcrumbs={["Jobs", "List"]}
        renderRight={
          <Button variant={"contained"} startIcon={<PostAdd />}>
            Create
          </Button>
        }
      />
      <JobsSearch />
      <ContentHandler /> */}
    </Container>
  );
}
