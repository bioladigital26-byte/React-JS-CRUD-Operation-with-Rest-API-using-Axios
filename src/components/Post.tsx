import { useEffect, useState } from "react";
import { deletePost, getPost, type Post } from "../api/PostApi";
import Form from "./Form";

function Posts() {
  const [data, setData] = useState<Post[]>([]);
  const [updateDataApi, setUpdateDataApi] = useState<Partial<Post>>({});

  const getPostData = async () => {
    const res = await getPost();
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id: number) => {
    try {
      const res = await deletePost(id);

      if (res.status === 200) {
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });

        setData(newUpdatedPosts);
      } else {
        console.log("failed to delete the post", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (curElem: Post) => setUpdateDataApi(curElem);

  return (
    <>
      <section className="section-form">
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="section-post">
        <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>Title:{title}</p>
                <p>Body:{body}</p>
                <button onClick={() => handleUpdatePost(curElem)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}

export default Posts;
