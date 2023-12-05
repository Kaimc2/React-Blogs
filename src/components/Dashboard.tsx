import { useContext, useEffect, useState } from "react";
import { Layout, theme, Space, Table } from "antd";
import { Link } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { axiosClient } from "../axios.client";
import AuthContext from "../Context/AuthContext";
import { DashboardLayout } from "../shared/layouts/DashboardLayout";
import PostContext from "../Context/PostContext";

interface DataType {
  id: string;
  title: string;
  slug: string;
  body: string;
}

export const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const { deletePost } = useContext(PostContext);
  const { Content } = Layout;
  const [posts, setPosts] = useState<DataType[]>([]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Content",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "Action",
      key: "action",
      render: (_, { id }) => {
        return (
          <Space size="middle">
            <Link className={"hover:bg-green-500 py-2 px-3 rounded-md hover:text-white"} to={`/post/${id}/edit`}>Edit</Link>
            <button className="hover:bg-red-500 py-1 px-3 rounded-md hover:text-white" onClick={() => deletePost(id)}>Delete</button>
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
  }, []);

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
          rowKey={(posts) => posts.slug}
          columns={columns}
          dataSource={posts}
        />
      </Content>
    </DashboardLayout>
  );
};
