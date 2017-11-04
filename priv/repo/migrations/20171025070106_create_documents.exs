defmodule OnlineEditor.Repo.Migrations.CreateDocuments do
  use Ecto.Migration

  def change do
    create table(:documents, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :owner, :string
      add :content, :text
      timestamps()
    end
  end

end
