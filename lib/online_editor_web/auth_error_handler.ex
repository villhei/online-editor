defmodule OnlineEditorWeb.AuthErrorHandler do
  import Plug.Conn
  use Phoenix.Controller, namespace: OnlineEditorWeb
  alias OnlineEditorWeb.ErrorView

  def auth_error(conn, {:no_resource_found, reason}, _opts) do
    conn
      |> put_status(401)
      |> render(ErrorView, "401.json", %{message: "Not logged in"})
  end

  def auth_error(conn, {type, reason}, _opts) do
    body = Poison.encode!(%{code: 401, message: to_string(type)})
    send_resp(conn, 401, body)
  end
end
