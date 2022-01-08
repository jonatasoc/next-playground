import type { NextPage } from "next";
import { Fragment } from "react";

interface Props {
  posts: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }[];
}

const Blog: NextPage<Props> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <Fragment key={post.id}>
          <li>{post.title}</li>
        </Fragment>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}

export default Blog;
