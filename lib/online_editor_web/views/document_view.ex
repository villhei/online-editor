defmodule OnlineEditorWeb.DocumentView do
  use OnlineEditorWeb, :view

  def render("index.json", %{documents: documents}) do
    render_many(documents, __MODULE__, "document.json")
  end

  def render("show.json", %{document: document}) do
    render_one(document, __MODULE__, "document.json")
  end

  def render("document.json", %{document: document}) do
    %{
      id: document.id,
      name: document.name,
      content: document.content,
      owner: document.owner,
      folder_id: document.folder_id,
      inserted_at: document.inserted_at,
      updated_at: document.updated_at
    }
  end
end
