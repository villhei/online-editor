defmodule OnlineEditorWeb.FolderController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Folder.Query
  alias OnlineEditorWeb.ErrorView
  alias OnlineEditor.Folder
  alias OnlineEditor.Repo

  def index(%Plug.Conn{query_params: %{"find" => name}} = conn, _params) do
    case Query.get_by_name(name) do
      nil ->
        conn |> respond_with_error(404, "404.json")

      folder ->
        conn |> render("folder.json", folder: folder)
    end
  end

  def index(%Plug.Conn{query_params: %{"children" => folder_id}} = conn, _params) do
    case Query.get_by_parent(folder_id) do
      folders -> conn |> render("index.json", folders: folders)
    end
  end

  def index(conn, _params) do
    folders = Query.all()
    render(conn, "index.json", folders: folders)
  end

  def show(conn, %{"id" => id}) do
    case Query.get_by_id(id) do
      nil ->
        conn
        |> respond_with_error(404, "404.json")

      folder ->
        conn
        |> put_status(200)
        |> render("show.json", folder: folder)
    end
  end

  def create(conn, params) do
    changeset = Folder.changeset(%Folder{}, params)

    case Repo.insert(changeset) do
      {:ok, folder} ->
        conn |> put_status(200) |> render("show.json", folder: folder)

      {:error, _changeset} ->
        conn
        |> respond_with_error(400, "400.json", error: "Unable to create document")
    end
  end

  def update(conn, %{"id" => id} = params) do
    with %Folder{} = folder <- Query.get_by_id(id),
         changeset <- Folder.changeset(folder, params),
         {:ok, folder} <- Repo.update(changeset) do
      conn
        |> put_status(200)
        |> render("show.json", folder: folder)
    else
      error -> handle_access_error(conn, error)
    end
  end

  def delete(conn, %{"id" => id}) do
    case Query.delete(id) do
      {:ok, _} -> send_resp(conn, :no_content, "")
      error -> handle_access_error(conn, error)
    end
  end
end
