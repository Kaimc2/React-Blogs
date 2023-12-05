import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PostContext, { formField } from "../../Context/PostContext";
import { EditForm } from "./form/EditForm";
import BarLoader from "react-spinners/BarLoader";
import { FormLayout } from "../../shared/layouts/FormLayout";
import { DashboardLayout } from "../../shared/layouts/DashboardLayout";
import AuthContext from "../../Context/AuthContext";

export const Edit = () => {
  const navigate = useNavigate();
  const { post, retrievePost } = useContext(PostContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [postData, setPostData] = useState<formField>();

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await retrievePost(String(id));

      setPostData({
        title: data.title,
        slug: data.slug,
        body: data.body,
        author_id: data.user_id,
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
    <DashboardLayout>
      <FormLayout>
        <EditForm postId={id} post={postData} />
      </FormLayout>
    </DashboardLayout>
  );
};
