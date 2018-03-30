defmodule OnlineEditor.Document.Query do
  import Ecto.Query
  alias OnlineEditor.Repo
  alias OnlineEditor.Document

  def descriptions do
    query =
      from(
        d in Document,
        where: d.deleted == false,
        select: %{
          id: d.id,
          name: d.name,
          owner: d.owner,
          folder_id: d.folder_id,
          updated_at: d.updated_at,
          inserted_at: d.inserted_at
        }
      )

    query
    |> Repo.all()
    |> remove_content
  end

  defp remove_content(documents) do
    documents
    |> Enum.map(fn document -> Map.put(document, :content, "") end)
  end

  def get_by_id(id) do
    Repo.get_by(Document, id: id, deleted: false) |> Repo.preload(:folder)
  end

  def get_by_folder(folder_id) do
    query =
      from(
        d in Document,
        where: d.folder_id == ^folder_id,
        preload: [:folder],
        select: d
      )

    Repo.all(query) |> remove_content
  end

  def delete(id) do
    with %Document{} = document <- get_by_id(id),
         changeset <- Document.delete_changeset(document),
         {:ok, document} <- Repo.update(changeset) do
      {:ok, document}
    else
      error -> error
    end
  end
end
