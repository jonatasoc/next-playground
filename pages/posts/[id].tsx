import { NextPage } from "next";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Props {
  post: Post;
}

interface Params {
  params: {
    id: number;
  };
}

const Post: NextPage<Props> = ({ post }) => {
  return <p>{post.title}</p>;
};

// This function gets called at build time
export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((post: Post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  const post = await res.json();

  // Pass post data to the page via props
  return { props: { post } };
}

export default Post;
