defmodule OnlineEditor.Folder.Query do
  import Ecto.Query
  alias OnlineEditor.Repo
  alias OnlineEditor.Folder

  def all do
    query =
      from(
        f in Folder,
        preload: [:children, :documents],
        select: f
      )

    Repo.all(query)
  end

  def get_by_id(id) do
    Repo.get_by(Folder, id: id) |> Repo.preload(:children) |> Repo.preload(:documents)
  end

  def get_by_name(name) do
    query =
      from(
        f in Folder,
        where: f.name == ^name,
        preload: [:children, :documents],
        select: f
      )

    Repo.one(query)
  end

  def get_by_parent(parent_id) do
    query =
      from(
        f in Folder,
        where: f.parent_id == ^parent_id,
        preload: [:children, :documents],
        select: f
      )

    Repo.all(query)
  end
end
