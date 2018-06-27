defmodule OnlineEditor.UserControllerTest do
  use OnlineEditorWeb.ConnCase

  alias OnlineEditorWeb.ErrorView

  defp render_json(template, assigns) do
    assigns = Map.new(assigns)

    OnlineEditorWeb.UserView.render(template, assigns)
    |> Poison.encode!()
    |> Poison.decode!()
  end

  test "GET 200 - current path returns the current user", %{conn: conn, user: user} do
    conn = get(conn, "/api/users/current")
    assert json_response(conn, 200) == render_json("show.json", %{user: user})
  end

  test "GET 401 - current path returns unauthorized if not signed in" do
    conn = Phoenix.ConnTest.build_conn()
    conn = get(conn, "/api/users/current")
    assert json_response(conn, 401) == ErrorView.render("401.json", %{message: "Not logged in"})
  end
end
