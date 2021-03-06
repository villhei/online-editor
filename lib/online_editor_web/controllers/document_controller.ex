defmodule OnlineEditorWeb.DocumentController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Document
  alias OnlineEditor.Repo
  alias OnlineEditor.Document.Query

  def index(%Plug.Conn{query_params: %{"folder" => folder_id}} = conn, _params) do
    case Query.get_by_folder(folder_id) do
      documents -> conn |> render("index.json", documents: documents)
    end
  end

  def index(conn, _params) do
    documents = Query.descriptions()
    render(conn, "index.json", documents: documents)
  end

  def show(conn, %{"id" => id}) do
    case Query.get_by_id(id) do
      nil ->
        conn
        |> respond_with_error(404, "404.json")

      document ->
        conn
        |> respond_show(document)
    end
  end

  def create(conn, params) do
    changeset = Document.create_changeset(%Document{}, params)

    case Repo.insert(changeset) do
      {:ok, document} ->
        conn
        |> respond_show(document)

      {:error, _changeset} ->
        conn
        |> respond_with_error(400, "400.json", error: "Unable to create document")
    end
  end

  def update(conn, %{"id" => id, "overwrite" => "false", "updated_at" => updated_at} = params) do
    document = Query.get_by_id(id)
    {:ok, incoming} = NaiveDateTime.from_iso8601(updated_at)

    case NaiveDateTime.compare(document.updated_at, incoming) do
      :gt -> respond_with_error(conn, 409, "409.json")
      _ -> update(conn, Map.drop(params, ["overwrite", "updated_at"]))
    end
  end

  def update(conn, %{"overwrite" => "false"}) do
    respond_with_error(
      conn,
      400,
      "400.json",
      error: "updated_at is a required timestamp in document body"
    )
  end

  def update(conn, %{"id" => id} = params) do
    with %Document{} = document <- Query.get_by_id(id),
         changeset <- Document.changeset(document, params),
         {:ok, document} <- Repo.update(changeset) do
      conn |> respond_show(document)
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

  defp respond_show(conn, document) do
    conn
    |> put_status(200)
    |> render("show.json", document: document)
  end
end
