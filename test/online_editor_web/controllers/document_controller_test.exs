defmodule OnlineEditorWeb.DocumentControllerTest do
  use OnlineEditorWeb.ConnCase
  import OnlineEditor.Factory

  defp document_format(document) do
    %{
      "name" => document.name,
      "content" => document.content,
      "owner" => document.owner,
      "inserted_at" => NaiveDateTime.to_iso8601(document.inserted_at),
      "updated_at" => NaiveDateTime.to_iso8601(document.updated_at)
    }
  end

  test "index path returns the list of all documents", %{conn: conn} do
    document = insert(:document)
    conn = get(conn, "/api/documents/")
    assert json_response(conn, 200) == [document_format(document)]
  end

  test "show path returns a single document", %{conn: conn} do
    document = insert(:document)
    conn = get(conn, "/api/documents/#{document.id}")
    assert json_response(conn, 200) == document_format(document)
  end
end