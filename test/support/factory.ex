defmodule OnlineEditor.Factory do
  use ExMachina.Ecto, repo: OnlineEditor.Repo
  alias OnlineEditor.Document
  alias OnlineEditor.Folder
  def document_factory() do
    %Document{
      name: "Document name.txt",
      content: "This is the document text content",
      owner: "ville.heikkinen@gmail.com"
    }
  end

  def folder_factory() do
    %Folder{
      name: "Root",
      deleted: false
    }
  end
end