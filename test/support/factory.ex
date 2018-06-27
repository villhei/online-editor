defmodule OnlineEditor.Factory do
  use ExMachina.Ecto, repo: OnlineEditor.Repo
  alias OnlineEditor.Document
  alias OnlineEditor.Folder
  alias OnlineEditor.User
  def document_factory() do
    %Document{
      name: "Document name.txt",
      content: "This is the document text content",
      owner: "ville.heikkinen@gmail.com",
      starred: false
    }
  end

  def folder_factory() do
    %Folder{
      name: "Root",
      deleted: false,
    }
  end

  def user_factory() do
    %User{
      first_name: "Foo",
      last_name: "Bar",
      email: "foo@bar.com",
      auth_provider: "test"
    }
  end
end
