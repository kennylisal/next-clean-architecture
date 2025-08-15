"use client";
import { PostHeader } from "@/entities/models/post";
import {
  Card,
  CardContent,
  Chip,
  List,
  Stack,
  styled,
  Typography,
} from "@mui/material";

export function GeneralPosts({ posts }: { posts: PostHeader[] | undefined }) {
  if (!posts) {
    return <h1>Tidak ada data</h1>;
  }
  const displayedData = posts;
  const CardWrapper = styled(Card)(({ theme }) => ({
    marginBottom: 10,
    cursor: "pointer",
    transition: theme.transitions.create(["box-shadow", "background-color"], {
      duration: theme.transitions.duration.shorter,
    }),
    "&:hover": {
      boxShadow: theme.shadows[15],
      backgroundColor: theme.palette.grey[50],
    },
  }));

  const jobsTagsList = ({ tags }: { tags: string[] }) => {
    return tags.map((tag, index) => (
      <Chip
        key={`${tag}_${index}`}
        label={tag}
        size={"small"}
        variant={"filled"}
      />
    ));
  };

  if (posts.length === 0) {
    return <h2>Belum ada Data</h2>;
  } else {
    return (
      <>
        <List sx={{ marginTop: 2 }}>
          {displayedData.map((data) => (
            <CardWrapper key={`${data.title}-${data.author}`}>
              <CardContent>
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Stack>
                    <Typography variant="h6" component={"h2"}>
                      {data.title}
                    </Typography>
                    <Typography variant="subtitle1" component={"h3"}>
                      {data.author} - {"Sekolah"}
                    </Typography>
                  </Stack>
                  <Typography
                    fontWeight={"fontWeightMedium"}
                    variant="subtitle1"
                  >
                    {"Seluruh Siswa"}
                  </Typography>
                </Stack>
                <Stack mt={1} direction={"row"} spacing={1}>
                  {jobsTagsList({
                    tags: ["siswa", "pendidikan semester", "SKS"],
                  })}
                </Stack>
              </CardContent>
            </CardWrapper>
          ))}
        </List>
      </>
    );
  }
}
