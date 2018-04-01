defmodule OnlineEditorWeb.FolderViewTest do
  use OnlineEditorWeb.ConnCase, async: true
  alias OnlineEditorWeb.FolderView
  alias OnlineEditor.Folder
  alias OnlineEditor.Document

  # Bring render/3 and render_to_string/3 for testing custom views
  import Phoenix.View

  test "renders folder.json" do
    folder = %Folder{
      id: "1",
      name: "Root",
      inserted_at: "now",
      updated_at: "never",
      documents: [%Document{
        id: "d1",
        name: "Document"
      }]
    }
    assert FolderView.render("folder.json", %{folder: folder }) ==
           %{
             id: "1",
             name: "Root",
             inserted_at: "now",
             updated_at: "never",
             documents: ["d1"]
           }
  end
end
