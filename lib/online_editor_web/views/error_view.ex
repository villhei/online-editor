defmodule OnlineEditorWeb.ErrorView do
  use OnlineEditorWeb, :view

  def render("404.html", _assigns) do
    "Page not found"
  end

  def render("404.json", _assigns) do
    %{"code" => 404, "message" => "Resource not found"}
  end

  def render("400.json", %{error: error}) do
    %{"code" => 404, "message" => error}
  end

  def render("400.json", _) do
    render("400.json", %{error: "Bad request"})
  end

  def render("401.json", %{message: message}) do
    %{"message" => message, "code" => 401}
  end

  def render("401.json", _assigns) do
    render("401.json", "Unauthorized")
  end

  def render("403.json", _assigns) do
    %{"message" => "Forbidden", "code" => 403}
  end

  def render("409.json", _) do
    %{"code" => 409, "message" => "A newer version of the resource exists"}
  end

  def render("422.json", _assigns) do
    %{"message" => "Unprocessable entity", "code" => 422}
  end

  def render("500.json", _assigns) do
    %{"message" => "Internal Server Error", "code" => 500}
  end

  def render("500.html", _assigns) do
    "Internal server error"
  end

  def render("505.html", _assigns) do
    "Internal server error"
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render("500.json", assigns)
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render("500.html", assigns)
  end
end
