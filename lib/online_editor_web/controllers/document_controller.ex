defmodule OnlineEditorWeb.DocumentController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Document
  alias OnlineEditor.Repo

  def index(conn, _params) do
    documents = Repo.all(Document)
    render(conn, "index.json", documents: documents)
  end

  def show(conn, %{"id" => id}) do
    case Repo.get(Document, id) do
      nil -> conn
              |> put_status(404)
              |> render(OnlineEditorWeb.ErrorView, "404.json")
      document -> conn
              |> render("show.json", document: document)
    end
  end
end