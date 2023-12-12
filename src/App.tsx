import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Login } from "./pages/auth/Login";
import { View } from "./pages/post/Show";
import { Create } from "./pages/post/Create";
import { Edit } from "./pages/post/Edit";
import { PostProvider } from "./context/PostContext";
import { Register } from "./pages/auth/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./utils/ProtectedRoute";
import { NavbarLayout } from "./components/Layout/NavbarLayout";
import { Dashboard } from "./pages/Dashboard";
import { Page404 } from "./pages/errors/Page404";
import { Page403 } from "./pages/errors/Page403";
import { Account } from "./pages/Account";

function App() {
  return (
    <div className="h-screen">
      <Router>
        <AuthProvider>
          <PostProvider>
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route element={<NavbarLayout />}>
                  <Route path="/post/create" element={<Create />} />
                </Route>

                <Route path="/post/:id/edit" element={<Edit />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/account" element={<Account />} />
              </Route>
              <Route element={<NavbarLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/post/:id" element={<View />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
