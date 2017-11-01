defmodule OnlineEditorWeb.DocumentControllerTest do
  use OnlineEditorWeb.ConnCase
  import OnlineEditor.Factory

  test "index path returns the list of all documents", %{conn: conn} do
    document = insert(:document)
    conn = get(conn, "/api/documents/")
    assert json_response(conn, 200) == [%{
      "name" => document.name,
      "content" => document.content,
      "owner" => document.owner,
      "inserted_at" => NaiveDateTime.to_iso8601(document.inserted_at),
      "updated_at" => NaiveDateTime.to_iso8601(document.updated_at)
    }]
  end
end