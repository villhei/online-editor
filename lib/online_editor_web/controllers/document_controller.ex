defmodule OnlineEditorWeb.DocumentController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Document
  alias OnlineEditor.Repo
  alias OnlineEditorWeb.ErrorView

  def index(conn, _params) do
    documents = Repo.all(Document)
    render(conn, "index.json", documents: documents)
  end

  def show(conn, %{"id" => id}) do
    case Repo.get(Document, id) do
      nil -> conn
              |> put_status(404)
              |> render(ErrorView, "404.json")
      document -> conn
              |> render("show.json", document: document)
    end
  end

  def create(conn, params) do
    changeset = Document.changeset(%Document{}, params)
    case Repo.insert(changeset) do
      {:ok, document} -> conn
                         |> put_status(200)
                         |> render("show.json", document: document)
      {:error, _changeset} -> conn
                         |> put_status(400)
                         |> render(ErrorView, "400.json", error: "Unable to create document")
    end
  end

  def update(conn, %{"id" => id} = params) do
    with  %Document{} = document <- Repo.get(Document, id),
          changeset              <- Document.changeset(document, params),
          {:ok, document}        <- Repo.update(changeset)
         do
          document
         end
    |> case do
      %Document{} = document -> conn |> put_status(200) |> render("show.json", document: document)
      nil                    -> conn |> put_status(404) |> render(ErrorView, "404.json")
      {:error, _}            -> conn |> put_status(400) |> render(ErrorView, "400.json")
      other                  -> conn |> put_status(500) |> render(ErrorView, "500.json")
    end
  end
end