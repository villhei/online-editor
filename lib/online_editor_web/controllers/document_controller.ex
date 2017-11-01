defmodule OnlineEditorWeb.DocumentController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Document
  alias OnlineEditor.Repo

  def index(conn, _params) do
    documents = Repo.all(Document)
    render(conn, "index.json", documents: documents)
  end

  def show(conn, %{"id" => id}) do
    document = Repo.get(Document, id)
    render(conn, "show.json", document: document)
  end
end