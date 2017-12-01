defmodule OnlineEditorWeb.PageControllerTest do
  use OnlineEditorWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "app_title"
  end
end
