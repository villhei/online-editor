defmodule OnlineEditor.Factory do
  use ExMachina.Ecto, repo: OnlineEditor.Repo
  alias OnlineEditor.Document

  def document_factory() do
    %Document{
      name: "Document name.txt",
      content: "This is the document text content",
      owner: "ville.heikkinen@gmail.com"
    }
  end
end