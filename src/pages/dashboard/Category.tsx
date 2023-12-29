import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import { ConfigProvider, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { axiosClient } from "../../utils/axios.client";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Search } from "../../components/common/Search";
import { Account } from "./Account";

interface CategoryItem {
  id: string;
  name: string;
}

export const Category = () => {
  const { user, token, isDarkMode } = useContext(AuthContext);
  const isAdmin = user.id === 1;
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const deleteCategory = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosClient
          .delete(`api/v1/dashboard/categories/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            toast.success("Category deleted successfully");
            axiosClient.get("api/v1/categories").then((res) => {
              setCategories(res.data.data);
            });
          });
      }
    });
  };

  const columns: ColumnsType<CategoryItem> = [
    {
      title: "Category",
      dataIndex: "name",
      key: "name",
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
              to={`/category/${id}/edit`}
            >
              Edit
            </Link>
            <button
              className="hover:bg-red-500 py-1 px-3 rounded-md hover:text-white"
              onClick={() => deleteCategory(id)}
            >
              Delete
            </button>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    document.title = "Category - React-Blog";
    axiosClient.get(`api/v1/categories?search=${search}`).then((res) => {
      setCategories(res.data.data);
      setLoading(false);
    });
  }, [search]);

  return isAdmin ? (
    <div className="dashboard">
      <Account />

      <div className="border border-gray-300 rounded shadow-md md:w-[80%] dark:bg-slate-800 dark:border-none">
        <Content className="m-5">
          <div className="flex justify-between p-2">
            <Search search={search} updateSearch={setSearch} />

            <Link
              to={`/category/create`}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-md hover:scale-105 hover:text-black dark:border-none dark:bg-slate-700 dark:hover:text-slate-300 transition-all ease-in-out"
            >
              Create
            </Link>
          </div>

          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerColor: isDarkMode ? "#CBD5E1" : "#000000",
                  headerBg: isDarkMode ? "#0F172A" : "#FAFAFA",
                  colorBgContainer: isDarkMode ? "#1e293b" : "#FAFAFA",
                  colorText: isDarkMode ? "#CBD5E1" : "#000000",
                  borderColor: isDarkMode ? "#334155" : "",
                },
                Pagination: {
                  colorText: "#cbd5e1",
                  colorTextDisabled: "",
                },
              },
            }}
          >
            <Table
              loading={loading}
              pagination={{ pageSize: 7 }}
              rowKey={(categories) => categories.id}
              columns={columns}
              dataSource={categories.map((item) => item)}
            />
          </ConfigProvider>
        </Content>
      </div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};
