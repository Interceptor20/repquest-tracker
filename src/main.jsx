import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Import Tailwind CSS
import Dashboard from "./Dashboard.jsx"; // Import Dashboard component
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dashboard />}>
      <Route
        path="dashboard"
        element={<Dashboard />}
        //    loader={({ request }) =>
        //    fetch("/api/dashboard.json", {
        //       signal: request.signal,
        //     })
        //   }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
