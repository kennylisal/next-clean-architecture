interface PostHeader {
  id: number;
  title: string;
  date: string;
  author: string;
}

interface Post {
  header: PostHeader;
  content: string;
}
