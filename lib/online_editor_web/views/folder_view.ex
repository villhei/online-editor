defmodule OnlineEditorWeb.FolderView do
  use OnlineEditorWeb, :view

  def render("index.json", %{folders: folders}) do
    render_many(folders, __MODULE__, "folder.json")
  end

  def render("show.json", %{folder: folder}) do
    render_one(folder, __MODULE__, "folder.json")
  end

  def render("folder.json", %{folder: folder}) do
    json = %{
      id: folder.id,
      name: folder.name,
      inserted_at: folder.inserted_at,
      updated_at: folder.updated_at
    }
    case folder.children do
      children when is_list(children) ->
          ids = children |> Enum.map(fn child -> child.id end)
          Map.put(json, :children, ids)
      _ -> json
    end
  end

end
