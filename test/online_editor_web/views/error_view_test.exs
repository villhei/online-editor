defmodule OnlineEditorWeb.ErrorViewTest do
  use OnlineEditorWeb.ConnCase, async: true

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders 404.html" do
    assert render_to_string(OnlineEditorWeb.ErrorView, "404.html", []) ==
           "Page not found"
  end

  test "renders 404.json" do
    assert render(OnlineEditorWeb.ErrorView, "404.json", []) ==
           %{"code" => 404, "message" => "Resource not found"}
  end

  test "renders 409.json" do
    assert render(OnlineEditorWeb.ErrorView, "409.json", []) ==
           %{"code" => 409, "message" => "A newer version of the resource exists"}
  end

  test "render 500.html" do
    assert render_to_string(OnlineEditorWeb.ErrorView, "500.html", []) ==
           "Internal server error"
  end

  test "render any other" do
    assert render_to_string(OnlineEditorWeb.ErrorView, "505.html", []) ==
           "Internal server error"
  end
end
