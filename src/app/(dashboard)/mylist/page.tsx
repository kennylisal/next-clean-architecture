"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ReplyIcon from "@mui/icons-material/Reply";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
const mockPost = {
  title: "This is a sample Reddit post title",
  author: "u/sampleuser",
  timestamp: "2 hours ago",
  score: 42,
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  comments: [
    {
      id: 1,
      author: "u/commenter1",
      timestamp: "1 hour ago",
      score: 10,
      content: "This is a top-level comment.",
      replies: [
        {
          id: 2,
          author: "u/replier1",
          timestamp: "30 minutes ago",
          score: 5,
          content: "Reply to the comment above.",
          replies: [],
        },
      ],
    },
    {
      id: 3,
      author: "u/commenter2",
      timestamp: "45 minutes ago",
      score: 8,
      content: "Another comment here.",
      replies: [],
    },
  ],
};

function getMockPost() {
  return {
    title: "This is a sample Reddit post title",
    author: "u/sampleuser",
    timestamp: "2 hours ago",
    score: 42,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    comments: [
      {
        id: 1,
        author: "u/commenter1",
        timestamp: "1 hour ago",
        score: 10,
        content: "This is a top-level comment.",
        replies: [
          {
            id: 2,
            author: "u/replier1",
            timestamp: "30 minutes ago",
            score: 5,
            content: "Reply to the comment above.",
            replies: [],
          },
        ],
      },
      {
        id: 3,
        author: "u/commenter2",
        timestamp: "45 minutes ago",
        score: 8,
        content: "Another comment here.",
        replies: [],
      },
    ],
  };
}

type tex = typeof mockPost;

type tez = (typeof mockPost.comments)[0];

export default function RedditThread() {
  const [post, setPost] = useState(mockPost);
  const [newComment, setNewComment] = useState("");
  const [score, setScore] = useState(post.score);

  const handleUpvote = () => setScore(score + 1);
  const handleDownvote = () => setScore(score - 1);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [
        ...post.comments,
        {
          id: Date.now(),
          author: "u/currentuser",
          timestamp: "Just now",
          score: 0,
          content: newComment,
          replies: [],
        },
      ];
      setPost({ ...post, comments: updatedComments });
      setNewComment("");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Post Card */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            {/* Vote Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: 2,
              }}
            >
              <IconButton onClick={handleUpvote} color="primary">
                <ArrowUpwardIcon />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {score}
              </Typography>
              <IconButton onClick={handleDownvote} color="secondary">
                <ArrowDownwardIcon />
              </IconButton>
            </Box>
            {/* Post Content */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {post.author} • {post.timestamp}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {post.content}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ChatBubbleOutlineIcon sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {post.comments.length} Comments
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            {/* Vote Section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mr: 2,
              }}
            >
              <IconButton onClick={handleUpvote} color="primary">
                <ArrowUpwardIcon />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {score}
              </Typography>
              <IconButton onClick={handleDownvote} color="secondary">
                <ArrowDownwardIcon />
              </IconButton>
            </Box>
            {/* Post Content */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>
                {post.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {post.author} • {post.timestamp}
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {post.content}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ChatBubbleOutlineIcon sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {post.comments.length} Comments
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
