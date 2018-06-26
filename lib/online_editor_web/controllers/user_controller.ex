defmodule OnnlineEditorWeb.UserController do
  use OnlineEditorWeb, :controller
  alias OnlineEditorWeb.User

  plug(Guardian.Plug.EnsureAuthenticated, handler: OnnlineEditorWeb.AuthController)

  def index(conn, _params) do
    users = Repo.all(User)
    render(conn, "index.json", users: users)
  end

  def current(conn, _) do
    user =
      conn
      |> Guardian.Plug.current_resource()

    conn
    |> render(OnnlineEditorWeb.UserView, "show.json", user: user)
  end
end
