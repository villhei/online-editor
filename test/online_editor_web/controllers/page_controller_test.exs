defmodule OnlineEditorWeb.PageControllerTest do
  use OnlineEditorWeb.ConnCase
  import OnlineEditorWeb.PageController

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "app_title"
  end

  test "GET /css/style.css", %{conn: conn} do
    conn = get conn, "/css/style.css"
    assert html_response(conn, 200) =~ "background: black"
  end

  test "GET non-existant", %{conn: conn} do
    conn = get conn, "/does-not-exist.html"
    assert html_response(conn, 200) =~ "app_title"
  end

  test "Path resolution", _ do
    res = resolve_path(["js", "app.js"])
    assert res ==  "priv/static/js/app.js"
  end
end
