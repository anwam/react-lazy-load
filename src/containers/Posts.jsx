import { useQuery } from "@tanstack/react-query";
import Post from "../components/Post";
import useIsInView from "../hooks/useIsInView";

function Posts() {
  // fetch using react-query
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/posts");
      return data.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return <div>Failed to fetch posts</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {data.map((post) => (
        <LazyPost key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;

function LazyPost({ post }) {
  const [show, ref] = useIsInView();

  return (
    <div
      style={{
        minHeight: "100px",
        height: "fit-content",
      }}
      ref={ref}
    >
      {show && <Post id={post.id} />}
    </div>
  );
}
