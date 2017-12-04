defmodule OnlineEditorWeb.DocumentController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Document
  alias OnlineEditor.Repo
  alias OnlineEditor.Document.Query
  alias OnlineEditorWeb.ErrorView

  def index(conn, _params) do
    documents = Query.descriptions()
    render(conn, "index.json", documents: documents)
  end

  def show(conn, %{"id" => id}) do
    case Repo.get(Document, id) do
      nil      -> conn
                  |> respond_with_error(404, "404.json")
      document -> conn
                  |> respond_show(document)
    end
  end

  def create(conn, params) do
    changeset = Document.changeset(%Document{}, params)
    case Repo.insert(changeset) do
      {:ok, document}       -> conn
                               |> respond_show(document)
      {:error, _changeset}  -> conn
                               |> respond_with_error(400, "400.json", error: "Unable to create document")
    end
  end

  def update(conn, %{"id" => id, "overwrite" => "false", "updated_at" => updated_at} = params) do
    document = Repo.get(Document, id)
    if(document.updated_at != updated_at) do
      respond_with_error(conn, 409, "409.json")
    else
      update(conn, Map.drop(params, ["overwrite", "updated_at"]))
    end
  end

  def update(conn, %{"overwrite" => "false"}) do
    respond_with_error(conn, 400, "400.json", error: "updated_at is a required timestamp in document body")
  end

  def update(conn, %{"id" => id} = params) do
    with %Document{} = document <- Repo.get(Document, id),
         changeset              <- Document.changeset(document, params),
         {:ok, document}        <- Repo.update(changeset)
         do
          conn |> respond_show(document)
    else
      error -> handle_update_error(conn, error)
    end
  end

  def delete(conn, %{"id" => id}) do
    with %Document{} = document <- Repo.get(Document, id),
         {:ok, _} <- Repo.delete(document)
         do
            send_resp(conn, :no_content, "")
    else
      error -> handle_update_error(conn, error)
    end
  end

  defp handle_update_error(conn, cause) do
    case cause do
      {:error, _} -> respond_with_error(conn, 400, "400.json")
      nil         -> respond_with_error(conn, 404, "404.json")
      _           -> respond_with_error(conn, 500, "500.json")
    end
  end

  defp respond_show(conn, document) do
    conn
    |> put_status(200)
    |> render("show.json", document: document)
  end

  defp respond_with_error(conn, error_code, error_view, error_message \\ []) do
    conn
    |> put_status(error_code)
    |> render(ErrorView, error_view, error_message)
  end
end
