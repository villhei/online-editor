defmodule OnlineEditorWeb.DocumentView do
  use OnlineEditorWeb, :view

  defp date_to_string(naive_date_time) do
    NaiveDateTime.to_string(naive_date_time)
  end

  def render("index.json", %{documents: documents}) do
    render_many(documents, __MODULE__, "document.json")
  end

  def render("document.json", %{document: document}) do
    %{
      name: document.name,
      content: document.content,
      owner: document.owner,
      inserted_at: document.inserted_at,
      updated_at: document.updated_at
    }
  end
end