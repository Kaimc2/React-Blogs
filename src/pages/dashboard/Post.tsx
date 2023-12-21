import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Layout, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { axiosClient } from "../../utils/axios.client";
import { Search } from "../../components/common/Search";
import PostContext from "../../context/PostContext";
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

export const Post = () => {
  const { Content } = Layout;
  const { token } = useContext(AuthContext);
  const { deletePost } = useContext(PostContext);
  const [posts, setPosts] = useState<DataType[]>();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);

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
      .get(`api/v1/dashboard/posts?search=${search}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const fetchData = res.data.data;
        setPosts(fetchData);
        setLoading(false);
      });
  }, [search, deletePost]);

  return (
    <div className="border border-gray-300 rounded shadow-md md:w-[80%]">
      <Content className="m-5">
        <div className="flex justify-between p-2">
          <Search search={search} updateSearch={setSearch} />

          <Link
            to={`/post/create`}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-md hover:scale-105 hover:text-black transition-all ease-in-out"
          >
            Create
          </Link>
        </div>

        <Table
          loading={loading}
          pagination={{ pageSize: 5 }}
          className="overflow-scroll"
          rowKey={(post) => post.title}
          columns={columns}
          dataSource={posts?.map((item) => item.post)}
        />
      </Content>
    </div>
  );
};
