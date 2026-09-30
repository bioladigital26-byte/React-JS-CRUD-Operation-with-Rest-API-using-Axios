import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { postData, updateData, type Post, type PostInput } from "../api/PostApi";

type FormProps = {
  data: Post[];
  setData: Dispatch<SetStateAction<Post[]>>;
  updateDataApi: Partial<Post>;
  setUpdateDataApi: Dispatch<SetStateAction<Partial<Post>>>;
};

function Form({ data, setData, updateDataApi, setUpdateDataApi }: FormProps) {
  const [addData, setAddData] = useState<PostInput>({
    title: "",
    body: "",
  });

  const isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    if (updateDataApi) {
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
    }
  }, [updateDataApi]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddData((prev) => {
      return { ...prev, [name]: value } as PostInput;
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log(res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id ?? 0, addData);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });

        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter;
    const action = submitter instanceof HTMLButtonElement ? submitter.value : undefined;

    if (action === "Add") {
      addPostData();
      return;
    }

    if (action === "Edit") {
      updatePostData();
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"> </label>
        <input
          type="text"
          autoComplete=""
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          placeholder="Add Post"
          id="body"
          name="body"
          value={addData.body}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" value={isEmpty ? "Add" : "Edit"}>
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
}

export default Form;
