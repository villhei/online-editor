defmodule OnlineEditorWeb.UserController do
  use OnlineEditorWeb, :controller
  alias OnlineEditorWeb.User

  def current(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    conn
    |> render(OnlineEditorWeb.UserView, "show.json", user: user)
  end
end
