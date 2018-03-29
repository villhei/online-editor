defmodule OnlineEditorWeb.FolderController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Folder.Query
  alias OnlineEditorWeb.ErrorView
  alias OnlineEditor.Folder
  alias OnlineEditor.Repo

  def index(%Plug.Conn{query_params: %{"find" => name}} = conn, _params) do
    case Query.get_by_name(name) do
      nil -> conn |> respond_with_error(404, "404.json")
      folder ->
          conn |> render("folder.json", folder: folder)
    end
  end

  def index(conn, _params) do
    folders = Query.all()
    render(conn, "index.json", folders: folders)
  end

  def create(conn, params) do
    changeset = Folder.changeset(%Folder{}, params)
    case Repo.insert(changeset) do
      {:ok, folder}       -> conn
                               |> put_status(200) |> render("show.json", folder: folder)
      {:error, _changeset}  -> conn
                               |> respond_with_error(400, "400.json", error: "Unable to create document")
    end
  end
end
