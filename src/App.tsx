import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/auth/Login";
import { View } from "./pages/post/Show";
import { Create as PostCreate } from "./pages/post/Create";
import { Create as CategoryCreate } from "./pages/category/Create";
import { Edit as PostEdit } from "./pages/post/Edit";
import { Edit as CategoryEdit } from "./pages/category/Edit";
import { PostProvider } from "./context/PostContext";
import { Register } from "./pages/auth/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/layout/ProtectedRoute";
import { NavbarLayout } from "./components/layout/NavbarLayout";
import { Dashboard } from "./pages/Dashboard";
import { Page404 } from "./pages/errors/Page404";
import { Page403 } from "./pages/errors/Page403";
import { Account } from "./pages/dashboard/Account";
import { Category } from "./pages/dashboard/Category";
import { VerifyEmail } from "./pages/auth/VerifyEmail";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { ResetPassword } from "./pages/auth/ResetPassword";

function App() { 
  return (
    <div id="home" className="h-screen">
      <Router>
        <AuthProvider>
          <PostProvider>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route element={<NavbarLayout />}>
                  <Route path="/post/create" element={<PostCreate />} />
                  <Route path="/post/:id/edit" element={<PostEdit />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/account" element={<Account />} />
                  <Route path="/dashboard/categories" element={<Category />} />
                  <Route path="/category/create" element={<CategoryCreate />} />
                  <Route path="/category/:id/edit" element={<CategoryEdit />} />
                </Route>
              </Route>

              <Route element={<NavbarLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/post/:id" element={<View />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/forbidden" element={<Page403 />} />
                <Route path="*" element={<Page404 />} />
              </Route>
            </Routes>
            <Toaster />
          </PostProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
