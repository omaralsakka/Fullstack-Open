import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import Togglable from "./Togglable";
import BlogForm from "./blogForm";

test("renders content", () => {
  const blog = {
    title: "testing blog",
    author: "react test",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("testing blog react test");
  screen.debug(element);
  expect(element).toBeDefined();
});

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();
  const setMessage = () => {
    return;
  };
  let container;
  container = render(
    <BlogForm createBlog={createBlog} setMessage={setMessage} />
  ).container;

  const input = container.querySelector(".title");
  const sendButton = screen.getByText("create");

  await user.type(input, "testing a form...");
  await user.click(sendButton);
  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
});

describe("<Togglable />", () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">url likes 10</div>
      </Togglable>
    ).container;
  });

  test("renders its children", () => {
    screen.findAllByAltText("some url likes 10");
  });

  test("at start children hidden", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test("toggled to hide", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const closeButton = screen.getByText("cancel");
    await user.click(closeButton);

    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });
});
