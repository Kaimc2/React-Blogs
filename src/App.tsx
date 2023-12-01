import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Navbar } from "./shared/Navbar";
import { Login } from "./components/Auth/Login";
import { View } from "./components/post/View";
import { Create } from "./components/post/Create";
import { Edit } from "./components/post/Edit";
import { PostProvider } from "./Context/PostContext";
import { Register } from "./components/Auth/Register";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="h-screen">
      <QueryClientProvider client={queryClient}>
        <Router>
          <PostProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/post/:id" element={<View />} />
              <Route path="/post/create" element={<Create />} />
              <Route path="/post/:id/edit" element={<Edit />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </PostProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
