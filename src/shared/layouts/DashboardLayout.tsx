import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FormOutlined,
  // UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import reactLogo from "../../assets/react.svg";

export const DashboardLayout = ({ children }: any) => {
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="w-full h-full">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <button
          onClick={() => navigate("/")}
          className="flex justify-center items-center p-5 space-x-4 text-white"
        >
          <img src={reactLogo} alt="logo" />
          {!collapsed && (
            <p className=" transition ease-in-out duration-150">React-Blog</p>
          )}
        </button>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FormOutlined />,
              label: "Posts",
              onClick: () => navigate("/dashboard"),
            },
            // {
            //   key: "2",
            //   icon: <UserOutlined />,
            //   label: "Account",
            //   onClick: () => navigate("/dashboard"),
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
