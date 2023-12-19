import { useContext, useEffect, useState } from "react";
import { Layout, Space, Table } from "antd";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { axiosClient } from "../utils/axios.client";
import AuthContext from "../context/AuthContext";
import { DashboardLayout } from "../components/Layout/DashboardLayout";
import PostContext from "../context/PostContext";
import parse from "html-react-parser";

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
  const { Content } = Layout;
  const { token } = useContext(AuthContext);
  const { deletePost } = useContext(PostContext);
  const [posts, setPosts] = useState<DataType[]>();

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
        <div className="max-h-[3rem] overflow-hidden">
          {content.length > 50
            ? parse(content.slice(0, 100) + "...")
            : parse(content)}
        </div>
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
              onClick={() => {
                deletePost(id);
                axiosClient
                  .get("api/v1/dashboard/posts", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res) => {
                    const fetchData = res.data.data;
                    setPosts(fetchData);
                  });
              }}
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
        setPosts(fetchData);
      });
  }, [posts]);

  return (
    <DashboardLayout>
      <Content>
        <Table
          className="overflow-scroll"
          rowKey={(post) => post.title}
          columns={columns}
          dataSource={posts?.map((item) => item.post)}
        />
      </Content>
    </DashboardLayout>
  );
};
