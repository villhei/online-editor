defmodule OnlineEditorWeb.DocumentControllerTest do
  use OnlineEditorWeb.ConnCase
  import OnlineEditor.Factory
  alias OnlineEditor.Document
  alias OnlineEditor.Repo
  alias OnlineEditorWeb.ErrorView

  @example_document %{
    content: "content",
    owner: "owner",
    name: "title"
  }

  @no_content_document %{
    content: "",
    owner: "owner",
    name: "title"
  }

  @empty_document %{}

  @invalid_document %{
    name: 123
  }

  defp render_json(template, assigns) do
    assigns = Map.new(assigns)

    OnlineEditorWeb.DocumentView.render(template, assigns)
    |> Poison.encode!()
    |> Poison.decode!()
  end

  defp with_folder(document, folder) do
    Map.put(document, :folder, folder.id)
  end

  test "GET 200 - index path returns the list of all documents", %{conn: conn} do
    document = insert(:document)
    conn = get(conn, "/api/documents/")

    assert json_response(conn, 200) ==
             render_json("index.json", documents: [%{document | content: ""}])
  end

  test "GET 200 - index path returns the list of documents in a folder", %{conn: conn} do
    folder = insert(:folder)
    insert(:document)

    documents =
      1..2
      |> Enum.map(fn n ->
        %Document{
          name: "document_#{n}",
          folder: folder,
          content: "Nonempty"
        }
      end)
      |> Enum.map(&insert(&1))
      |> Enum.map(&Map.put(&1, :content, ""))

    conn = get(conn, "/api/documents/?folder=#{folder.id}")
    assert json_response(conn, 200) == render_json("index.json", documents: documents)
  end

  test "GET 200 - show path returns a single document", %{conn: conn} do
    document = insert(:document)
    conn = get(conn, "/api/documents/#{document.id}")
    assert json_response(conn, 200) == render_json("show.json", document: document)
  end

  test "GET 404 - show path returns a 404 not found document", %{conn: conn} do
    conn = get(conn, "/api/documents/#{UUID.uuid4()}")
    assert json_response(conn, 404) == ErrorView.render("404.json")
  end

  test "POST 200 - create path allows creating documents", %{conn: conn} do
    payload = with_folder(@example_document, insert(:folder))
    conn = post(conn, "/api/documents", payload)
    document = Repo.get_by(Document, @example_document)
    assert document
    assert json_response(conn, 200) == render_json("show.json", document: document)
  end

  test "POST 200 - create path allows creating documents without content", %{conn: conn} do
    payload = with_folder(@no_content_document, insert(:folder))
    conn = post(conn, "/api/documents", payload)
    document = Repo.get_by(Document, @no_content_document)
    assert document
    assert json_response(conn, 200) == render_json("show.json", document: document)
  end

  test "POST 200 - create path allows creating documents with an assigned folder", %{conn: conn} do
    folder = insert(:folder)
    payload = Map.put(@no_content_document, :folder, folder.id)
    post(conn, "/api/documents", payload)

    document =
      Repo.get_by(Document, @no_content_document)
      |> Repo.preload(:folder)

    assert document.folder == folder
  end

  test "POST 200 - create path allows creating documents with only folder and name", %{conn: conn} do
    folder = insert(:folder)
    payload = %{
      :name => "title",
      :folder => folder.id}
    conn = post(conn, "/api/documents", payload)

    document =
      Repo.get_by(Document, %{:name => "title"})
      |> Repo.preload(:folder)

    assert json_response(conn, 200) == render_json("show.json", document: document)
  end

  test "POST 400 - does not accept invalid attrs", %{conn: conn} do
    conn = post(conn, "/api/documents", @empty_document)

    assert json_response(conn, 400) ==
             ErrorView.render("400.json", error: "Unable to create document")
  end

  test "PUT 200 - update path allows updating documents", %{conn: conn} do
    document = insert(:document)
    conn = put(conn, "/api/documents/#{document.id}", %{content: "new content"})
    body = json_response(conn, 200)
    assert body["content"] == "new content"
  end

  test "PUT 404 - update path returns an error on missing document", %{conn: conn} do
    conn = put(conn, "/api/documents/#{UUID.uuid4()}", @example_document)
    assert json_response(conn, 404) == ErrorView.render("404.json")
  end

  test "PUT 400 - update path returns an error on bad arguments", %{conn: conn} do
    document = insert(:document)
    conn = put(conn, "/api/documents/#{document.id}", @invalid_document)
    assert json_response(conn, 400) == ErrorView.render("400.json")
  end

  test "PUT 409 - update path returns an error if a newer version exists and overwrite is not wanted",
       %{conn: conn} do
    document = insert(:document)
    updated = %{content: "updated content"}
    Repo.update(Document.changeset(document, updated))

    payload = %{
      content: "should no be allowed",
      updated_at: NaiveDateTime.to_iso8601(document.updated_at)
    }

    conn = put(conn, "/api/documents/#{document.id}?overwrite=false", payload)
    assert json_response(conn, 409) == ErrorView.render("409.json")
  end

  test "PUT 200 - update path allows to update a document for which a later version does not exist",
       %{conn: conn} do
    document = insert(:document)

    updated = %{
      content: "updated content",
      updated_at: NaiveDateTime.to_iso8601(document.updated_at)
    }

    conn = put(conn, "/api/documents/#{document.id}?overwrite=false", updated)
    body = json_response(conn, 200)
    assert body["content"] == "updated content"
  end

  test "PUT 400 - update path requires updated_at on overwrite", %{conn: conn} do
    document = insert(:document)
    payload = %{content: "should no be allowed"}
    conn = put(conn, "/api/documents/#{document.id}?overwrite=false", payload)

    assert json_response(conn, 400) ==
             ErrorView.render(
               "400.json",
               error: "updated_at is a required timestamp in document body"
             )
  end

  test "DELETE 204 - delete path allows deleting documents", %{conn: conn} do
    document = insert(:document)
    conn = delete(conn, "/api/documents/#{document.id}")
    assert response(conn, 204)
  end

  test "DELETE 404 - delete path returns an error on missing document", %{conn: conn} do
    conn = delete(conn, "/api/documents/#{UUID.uuid4()}")
    assert json_response(conn, 404) == ErrorView.render("404.json")
  end

  test "GET 404 - does not fetch deleted document", %{conn: conn} do
    document = insert(:document)
    conn = delete(conn, "/api/documents/#{document.id}")
    assert response(conn, 204)
    conn = get(conn, "/api/documents/#{document.id}")
    assert response(conn, 404)
  end
end
