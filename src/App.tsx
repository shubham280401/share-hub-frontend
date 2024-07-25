import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import { AppProvider } from "./context/AppState";
import Home from "./components/home";
import Post from "./components/post";
import Profile from "./components/profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/login";
import SignUp from "./components/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/posts/:id",
    element: <Post />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppProvider>
  );
}

export default App;
