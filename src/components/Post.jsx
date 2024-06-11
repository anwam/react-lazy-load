import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";

function Post({ id }) {
  // only fetch when the component is mounted and in view (lazy loading)
  // fetch using react-query
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const data = await fetch(
        `http://jsonplaceholder.typicode.com/posts/${id}`
      );
      return data.json();

      // console.log(`Fetching post ${id}...`);
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       title: `Post ${id} title`,
      //       body: `Post ${id} body`,
      //     });
      //   }, 1000);
      // });
    },
  });

  if (isLoading) {
    return <div>Loading post...</div>;
  }

  if (!isSuccess) {
    return <div>Failed to fetch post</div>;
  }

  return (
    <div>
      <h2>
        Post {id}
        {data.title}
      </h2>
      <p>{data.body}</p>
    </div>
  );
}

Post.propTypes = { id: PropTypes.number.isRequired };

export default Post;
