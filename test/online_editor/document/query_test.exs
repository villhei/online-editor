defmodule OnlineEditorWeb.DocumentQueryTest do
  use OnlineEditor.DataCase
  import OnlineEditor.Factory
  alias OnlineEditor.Document
  alias Document.Query

  test "find_by_folder returns documents in a directory" do
    folder = insert(:folder)

    document =
      insert(%Document{
        name: "Child",
        folder: folder,
        deleted: false
      })

    actual = Query.get_by_folder(folder.id)

    assert [document] == actual
  end

  test "deleting flags entries se deleted" do
    folder = insert(:folder)

    document =
      insert(%Document{
        name: "Child",
        folder: folder,
        deleted: false
      })

    actual = Query.delete(document.id)

    assert {:ok, %{deleted: true}} = actual
  end

  test "find_by_folder does not return deleted documents in a directory" do
    folder = insert(:folder)

    insert(%Document{
      name: "Child",
      folder: folder,
      deleted: true
    })

    actual = Query.get_by_folder(folder.id)

    assert [] == actual
  end
end
