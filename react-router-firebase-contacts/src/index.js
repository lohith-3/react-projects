import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App, { loader as rootLoader, action as rootAction } from "./App";
import reportWebVitals from "./reportWebVitals";

// router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// route components
import ErrorPage from "./routes/error/error-page.component";
import Contact, {
  loader as contactLoader,
} from "./routes/contact/contact.component";
import EditContact, {
  loader as editContactLoader,
  action as editActionLoader,
} from "./routes/edit/edit.component";
import Destroy, {
  action as deleteAction,
} from "./routes/destroy/destroy.component.jsx";
import Index from "./routes/index/index.component";

// routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: editContactLoader,
        action: editActionLoader,
      },
      {
        path: "contacts/:contactId/destroy",
        action: deleteAction,
        errorElement: <Destroy />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
