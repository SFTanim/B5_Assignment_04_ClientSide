import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllBooks from "@/pages/AllBooks";
import Home from "@/pages/Home";
import AddBook from "@/pages/AddBook";
import BorrowSummery from "@/pages/BorrowSummery";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    // element: <div>Hello world!</div>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/books",
        Component: AllBooks
      },
      {
        path: "/create-book",
        Component: AddBook
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummery
      }
    ]
  },
]);

export default router