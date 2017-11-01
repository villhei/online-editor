defmodule OnlineEditorWeb.DocumentController do
  use OnlineEditorWeb, :controller

  alias OnlineEditor.Document
  alias OnlineEditor.Repo

  def index(conn, _params) do
    documents = Repo.all(Document)
    render(conn, "index.json", documents: documents)
  end
end