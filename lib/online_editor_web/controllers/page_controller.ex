defmodule OnlineEditorWeb.PageController do
  use OnlineEditorWeb, :controller
  @file_module Application.get_env(:online_editor, :file_module)

  def index(conn, _params) do
    index = Application.app_dir(:online_editor, "priv/static/index.html")
    html(conn, @file_module.read!(index))
  end
end
