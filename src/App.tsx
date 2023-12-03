import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Login } from "./components/auth/Login";
import { View } from "./components/post/View";
import { Create } from "./components/post/Create";
import { Edit } from "./components/post/Edit";
import { PostProvider } from "./Context/PostContext";
import { Register } from "./components/auth/Register";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoutes from "./utils/ProtectedRoute";
import { NavbarLayout } from "./shared/layouts/NavbarLayout";
import { Dashboard } from "./components/Dashboard";

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
                  <Route path="/post/:id/edit" element={<Edit />} />
                </Route>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route element={<NavbarLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/post/:id" element={<View />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
            </Routes>
          </PostProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
