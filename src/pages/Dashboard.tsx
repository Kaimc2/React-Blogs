import { useContext, useEffect, useState } from "react";
import { Layout, theme, Space, Table } from "antd";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { axiosClient } from "../utils/axios.client";
import AuthContext from "../context/AuthContext";
import { DashboardLayout } from "../components/Layout/DashboardLayout";
import PostContext from "../context/PostContext";

interface PostItem {
  id: string;
  title: string;
  thumbnail: string;
  category: string;
  body: string;
}

interface DataType {
  post: PostItem;
}

export const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const { deletePost } = useContext(PostContext);
  const { Content } = Layout;
  const [posts, setPosts] = useState<DataType[]>();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns: ColumnsType<PostItem> = [
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img
          className=" max-w-[7rem]"
          src={import.meta.env.VITE_BACKEND_URL + thumbnail}
          alt="Thumbnail"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Content",
      dataIndex: "body",
      key: "body",
      render: (content: string) => (
        <p>{content.length > 50 ? content.slice(0, 100) + "..." : content}</p>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, { id }) => {
        return (
          <Space size="middle">
            <Link
              className={
                "hover:bg-green-500 py-2 px-3 rounded-md hover:text-white"
              }
              to={`/post/${id}/edit`}
            >
              Edit
            </Link>
            <button
              className="hover:bg-red-500 py-1 px-3 rounded-md hover:text-white"
              onClick={() => deletePost(id)}
            >
              Delete
            </button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    axiosClient
      .get("api/v1/dashboard/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const fetchData = res.data.data;
        // console.log(fetchData);
        setPosts(fetchData);
      });
  }, [setPosts]);

  return (
    <DashboardLayout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        <Table
          rowKey={(post) => post.title}
          columns={columns}
          dataSource={posts?.map((item) => item.post)}
        />
      </Content>
    </DashboardLayout>
  );
};
