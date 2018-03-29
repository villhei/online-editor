defmodule OnlineEditorWeb.FolderControllerTest do
  use OnlineEditorWeb.ConnCase
  import OnlineEditor.Factory
  alias OnlineEditor.Folder
  alias OnlineEditorWeb.ErrorView

  defp render_json(template, assigns) do
    assigns = Map.new(assigns)

    OnlineEditorWeb.FolderView.render(template, assigns)
    |> Poison.encode!()
    |> Poison.decode!()
  end

  test "GET 200 - index path returns the list of all folders", %{conn: conn} do
    folder = insert(:folder)
    conn = get(conn, "/api/folders/")

    assigns = [
      folders: [%{folder | children: []}]
    ]

    expected = render_json("index.json", assigns)
    assert json_response(conn, 200) == expected
  end

  test "GET 200 - index path returns the list of all folders when multiple", %{conn: conn} do
    parent = insert(:folder)

    child =
      insert(%Folder{
        name: "Child",
        parent: parent,
        children: []
      })

    parent = %{parent | children: [child]}

    expected = render_json("index.json", folders: [parent, child])
    conn = get(conn, "/api/folders/")
    assert json_response(conn, 200) == expected
  end

  test "GET 200 - find by name can return the root folder", %{conn: conn} do
    folder = insert(:folder) |> Map.put(:children, [])
    conn = get(conn, "/api/folders/?find=Root")
    assert json_response(conn, 200) == render_json("folder.json", %{folder: folder})
  end

  test "GET 200 - index path allows for fetching children", %{conn: conn} do
    parent = insert(:folder)

    child =
      insert(%Folder{
        name: "Child",
        parent: parent,
        children: []
      })

    parent = %{parent | children: [child]}
    expected = render_json("index.json", folders: [child])
    conn = get(conn, "/api/folders?children=#{parent.id}")
    assert json_response(conn, 200) == expected
  end

  test "GET 404 - find by name returns not found for nonexistant folder", %{conn: conn} do
    conn = get(conn, "/api/folders/?find=Something")
    assert json_response(conn, 404) == ErrorView.render("404.json")
  end

  test "GET 200 - find by name can returns a folder populated with children", %{conn: conn} do
    parent = insert(:folder)

    child =
      insert(%Folder{
        name: "Child",
        parent: parent
      })

    conn = get(conn, "/api/folders/?find=Root")

    assigns = [
      folder: %{
        parent
        | children: [child]
      }
    ]

    assert json_response(conn, 200) == render_json("folder.json", assigns)
  end
end
