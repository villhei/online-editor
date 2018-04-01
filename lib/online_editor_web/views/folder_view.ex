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
      updated_at: folder.updated_at,
    }
    |> add_ids(folder, :children)
    |> add_ids(folder, :documents)

  end

  defp add_ids(json, folder, key) do
    case Map.get(folder, key) do
      value when is_list(value) ->
        ids = value |> Enum.map(fn e -> e.id end)
        Map.put(json, key, ids)
    _ -> json
    end
  end
end
