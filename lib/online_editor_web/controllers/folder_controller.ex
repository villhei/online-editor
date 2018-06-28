defmodule OnlineEditorWeb.FolderController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Folder.Query
  alias OnlineEditorWeb.ErrorView
  alias OnlineEditor.Folder
  alias OnlineEditor.Repo

  def index(%Plug.Conn{query_params: %{"find" => name}} = conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    case Query.get_by_name(user.id, name) do
      nil ->
        conn |> render("index.json", folders: [])

      folder ->
        conn |> render("index.json", folders: [folder])
    end
  end

  def index(%Plug.Conn{query_params: %{"children" => folder_id}} = conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    case Query.get_by_parent(user.id, folder_id) do
      folders -> conn |> render("index.json", folders: folders)
    end
  end

  def index(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    folders = Query.all(user.id)
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

  defp is_child(_, nil) do
    {:ok, false}
  end

  defp is_child(parent_id, candidate_id) do
    %Folder{} = maybe_child = Query.get_by_id(candidate_id)

    if maybe_child.parent_id == parent_id do
      {:ok, true}
    else
      is_child(parent_id, maybe_child.parent_id)
    end
  end

  defp do_update(conn, %{"id" => id} = params) do
    with %Folder{} = folder <- Query.get_by_id(id),
         changeset <- Folder.changeset(folder, params),
         {:ok, folder} <- Query.update(changeset) do
      conn
      |> put_status(200)
      |> render("show.json", folder: folder)
    else
      error -> handle_access_error(conn, error)
    end
  end

  def update(conn, %{"id" => id, "parent" => parent_id} = params) do
    case parent_id do
      ^id ->
        conn |> respond_with_error(400, "400.json", error: "Cannot set parent to self")

      nil ->
        conn |> respond_with_error(400, "400.json", error: "Parent cannot be non-uuid value")

      _ ->
        case is_child(id, parent_id) do
          {:ok, false} ->
            conn
            |> do_update(params)

          {:ok, true} ->
            conn
            |> respond_with_error(
              400,
              "400.json",
              error: "The new parent cannot have the folder as it's ancestor"
            )
        end
    end
  end

  def update(conn, params) do
    do_update(conn, params)
  end

  def delete(conn, %{"id" => id}) do
    case Query.delete(id) do
      {:ok, _} -> send_resp(conn, :no_content, "")
      error -> handle_access_error(conn, error)
    end
  end
end
