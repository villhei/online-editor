defmodule OnlineEditor.Document.Query do
  import Ecto.Query
  alias OnlineEditor.Repo
  alias OnlineEditor.Document

  def descriptions do
    query = from d in Document,
            select: %{id: d.id,
                      name: d.name,
                      owner: d.owner,
                      updated_at: d.updated_at,
                      inserted_at: d.inserted_at}
    query |> Repo.all()
          |> Enum.map(fn(document) -> struct(Document, Map.put(document, :content, "")) end)
  end
end