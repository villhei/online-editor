defmodule OnlineEditorWeb.FolderControllerTest do
  use OnlineEditorWeb.ConnCase
  import OnlineEditor.Factory
  alias OnlineEditor.Folder
  alias OnlineEditorWeb.ErrorView
  @no_relations %{children: [], documents: []}

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
      folders: [Map.merge(folder, @no_relations)]
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
        children: [],
        documents: []
      })

    parent = Map.merge(parent, %{children: [child], documents: []})

    expected = render_json("index.json", folders: [parent, child])
    conn = get(conn, "/api/folders/")
    assert json_response(conn, 200) == expected
  end

  test "GET 200 - find by name can return the root folder", %{conn: conn} do
    folder = insert(:folder) |> Map.merge(@no_relations)
    conn = get(conn, "/api/folders/?find=Root")
    assert json_response(conn, 200) == render_json("index.json", %{folders: [folder]})
  end

  test "GET 200 - index path allows for fetching children", %{conn: conn} do
    parent = insert(:folder)

    child =
      insert(%Folder{
        name: "Child",
        parent: parent,
        children: [],
        documents: []
      })

    parent = %{parent | children: [child]}
    expected = render_json("index.json", folders: [child])
    conn = get(conn, "/api/folders?children=#{parent.id}")
    assert json_response(conn, 200) == expected
  end

  test "GET 200 - find by name returns not found for nonexistant folder", %{conn: conn} do
    conn = get(conn, "/api/folders/?find=Something")
    assert json_response(conn, 200) == []
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
      folders: [
        %{
          parent
          | children: [child],
            documents: []
        }
      ]
    ]

    assert json_response(conn, 200) == render_json("index.json", assigns)
  end

  test "PUT 200 - update path allows updating folders", %{conn: conn} do
    folder = insert(:folder)
    conn = put(conn, "/api/folders/#{folder.id}", %{name: "new name"})
    body = json_response(conn, 200)
    assert body["name"] == "new name"
  end

  test "PUT 404 - update path returns a 404 on missing folder", %{conn: conn} do
    conn = put(conn, "/api/folders/#{UUID.uuid4()}", %{name: "new name"})
    assert json_response(conn, 404) == ErrorView.render("404.json")
  end

  test "PUT 400 - update path does not allow setting parent to self", %{conn: conn} do
    folder = insert(:folder)
    conn = put(conn, "/api/folders/#{folder.id}", %{parent: folder.id})

    assert json_response(conn, 400) ==
             ErrorView.render("400.json", %{error: "Cannot set parent to self"})
  end

  test "PUT 400 - Cannot unset a parent", %{conn: conn} do
    root = insert(:folder)

    child =
      insert(%Folder{
        name: "Child",
        parent: root
      })

    conn = put(conn, "/api/folders/#{child.id}", %{parent: nil})

    assert json_response(conn, 400) ==
             ErrorView.render("400.json", %{error: "Parent cannot be non-uuid value"})
  end

  test "PUT 400 - Cannot set a parent, if new parent exists in children", %{conn: conn} do
    root = insert(:folder)

    child =
      insert(%Folder{
        name: "Child",
        parent: root
      })

    grandchild =
      insert(%Folder{
        name: "Grandchild",
        parent: child
      })

    conn = put(conn, "/api/folders/#{child.id}", %{parent: grandchild.id})

    assert json_response(conn, 400) ==
             ErrorView.render("400.json", %{
               error: "The new parent cannot have the folder as it's ancestor"
             })
  end

  test "DELETE 204 - delete path allows deleting folders", %{conn: conn} do
    folder = insert(:folder)
    conn = delete(conn, "/api/folders/#{folder.id}")
    assert response(conn, 204)
  end

  test "DELETE 404 - delete path returns an error on missing folder", %{conn: conn} do
    conn = delete(conn, "/api/folders/#{UUID.uuid4()}")
    assert json_response(conn, 404) == ErrorView.render("404.json")
  end
end
