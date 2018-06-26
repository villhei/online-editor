defmodule OnlineEditorWeb.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, reason}, _opts) do
    body = Poison.encode!(%{code: 401, message: to_string(type)})
    send_resp(conn, 401, body)
  end
end
