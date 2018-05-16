defmodule OnlineEditorWeb.DocumentQueryTest do
  use OnlineEditor.DataCase
  import OnlineEditor.Factory
  alias OnlineEditor.Document
  alias Document.Query

  test "the create changeset should require folder and name" do
    assert %{
             valid?: false,
             errors: [
               name: {_, [validation: :required]},
               folder_id: {_, [validation: :required]}
             ]
           } = Document.create_changeset(%Document{}, %{})
  end

  test "the create changeset should accept name and folder as valid" do
    assert %{valid?: true} =
             Document.create_changeset(%Document{}, %{"name" => "foo", "folder" => "root"})
  end

  test "the create changeset should transform folder to folder_id for database use" do
    assert %{changes: %{folder_id: "root"}} =
             Document.create_changeset(%Document{}, %{"folder" => "root"})
  end

  test "the changeset should transform folder to folder_id for database use" do
    assert %{changes: %{folder_id: "root"}} =
             Document.changeset(%Document{}, %{"folder" => "root"})
  end
end
