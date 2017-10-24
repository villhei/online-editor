defmodule OnlineEditorWeb.PageController do
  use OnlineEditorWeb, :controller
  @file_module Application.get_env(:online_editor, :file_module)

  @static_path ["priv", "static"]

  def resolve_path(file_path) do
    Path.join(@static_path ++ file_path)
  end

  def try_read_file(file_path) do
    file_path = resolve_path(file_path)
    file_res = @file_module.read(file_path)
  end

  def index(conn, %{"path" => request_path} = params) do
    case try_read_file(request_path) do
      {:ok, file} -> html(conn, file)
      _ -> index(conn, Map.drop(params, ["path"]))
    end
  end

  def index(conn, _params) do
    html(conn, @file_module.read!("priv/static/index.html"))
  end
end
