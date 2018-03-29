defmodule OnlineEditor.Folder.Query do
  import Ecto.Query
  alias OnlineEditor.Repo
  alias OnlineEditor.Folder

  def all do
    query = from(f in Folder,
      preload: [:children],
      select: f)
    Repo.all(query)
  end

  def get_by_name(name) do
    query = from(f in Folder,
                where: f.name == ^name,
                preload: [:children],
                select: f)
    Repo.one(query)
  end
end