import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
