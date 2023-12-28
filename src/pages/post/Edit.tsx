import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PostContext, {
  CategoryType,
  formField,
} from "../../context/PostContext";
import { EditForm } from "./form/EditForm";
import { FormLayout } from "../../components/layout/FormLayout";
import AuthContext from "../../context/AuthContext";
import { Loader } from "../../components/common/Loading";

export const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { retrievePost, getCategories } = useContext(PostContext);
  const [postData, setPostData] = useState<formField>();
  const { user, authorize } = useContext(AuthContext);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    document.title = "Edit - React-Blog";
    const fetchData = async () => {
      const data: any = await retrievePost(String(id)).catch((error) => {
        if (error.response.status === 404) {
          navigate("/*");
        }
      });

      if (!data) return;

      const response: any = await getCategories();
      // console.log(data);

      setPostData({
        title: data.post.title,
        thumbnail: data.post.thumbnail,
        category_id: data.post.category_id,
        body: data.post.body,
        author_id: data.relationships.author_id,
      });

      setCategories(response.data.data);
    };

    fetchData();
  }, [id]);

  if (!postData) return <Loader />;

  authorize(user.id, postData.author_id);

  return (
    <div className="dashboard">
      <FormLayout>
        <EditForm postId={String(id)} post={postData} categories={categories} />
      </FormLayout>
    </div>
  );
};
