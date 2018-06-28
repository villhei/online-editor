defmodule OnlineEditor.Folder.Query do
  use OnlineEditor, :query
  alias OnlineEditor.Folder

  def all(user_id) do
    query =
      from(
        f in Folder,
        where: f.user_id == ^user_id,
        preload: [:children, :documents],
        select: f
      )

    Repo.all(query)
  end

  def get_by_id(id) do
    Repo.get_by(Folder, id: id, deleted: false)
    |> Repo.preload(:children)
    |> Repo.preload(:documents)
  end

  def get_by_name(user_id, name) do
    query =
      from(
        f in Folder,
        where: f.name == ^name and f.user_id == ^user_id,
        preload: [:children, :documents],
        select: f
      )

    Repo.one(query)
  end

  def update(changeset) do
    Repo.update(changeset)
  end

  def get_by_parent(user_id, parent_id) do
    query =
      from(
        f in Folder,
        where: f.parent_id == ^parent_id and f.user_id == ^user_id,
        preload: [:children, :documents],
        select: f
      )

    Repo.all(query)
  end

  def delete(id) do
    with %Folder{} = folder <- get_by_id(id),
         changeset <- Folder.delete_changeset(folder),
         {:ok, folder} <- Repo.update(changeset) do
      {:ok, folder}
    else
      error -> error
    end
  end
end
