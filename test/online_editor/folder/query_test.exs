defmodule OnlineEditorWeb.FolderQueryTest do
  use OnlineEditor.DataCase
  import OnlineEditor.Factory
  alias OnlineEditor.Folder
  alias OnlineEditor.Folder.Query
  @unloaded %Ecto.Association.NotLoaded{}
  @unloaded_parent %{@unloaded | __field__: :parent, __owner__: OnlineEditor.Folder, __cardinality__: :one}
  @unloaded_children %{@unloaded | __field__: :children, __owner__: OnlineEditor.Folder, __cardinality__: :many}

  test "find_by_name returns a folder populated with children" do
    parent = insert(:folder)
    child = insert(%Folder{
      name: "Child",
      parent: parent,
      deleted: false
    })
    child = %{child | parent: @unloaded_parent, children: @unloaded_children}

    actual = Query.get_by_name("Root")

    expected = %{ parent | parent: @unloaded_parent, children: [child], deleted: false}
    assert expected  == actual
  end

end