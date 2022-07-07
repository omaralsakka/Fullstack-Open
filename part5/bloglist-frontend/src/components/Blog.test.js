import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "testing blog",
    author: "react test",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("testing blog react test");
  expect(element).toBeDefined();
});
