import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PostContext, { formField } from "../../context/PostContext";
import { EditForm } from "./form/EditForm";
import BarLoader from "react-spinners/BarLoader";
import { FormLayout } from "../../components/Layout/FormLayout";

export const Edit = () => {
  const { post, retrievePost } = useContext(PostContext);
  const { id } = useParams();
  const [postData, setPostData] = useState<formField>();

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await retrievePost(String(id));

      setPostData({
        title: data.title,
        slug: data.slug,
        body: data.body,
      });
    };

    fetchData();
  }, []);

  if (!post || !postData) {
    return (
      <div className="h-4/5 flex justify-center items-center">
        <BarLoader
          color={"#000000"}
          loading={true}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={2}
        />
      </div>
    );
  }

  return (
    <FormLayout>
      <EditForm postId={id} post={postData} />
    </FormLayout>
  );
};
