defmodule OnlineEditor.Repo.Migrations.CreateFolders do
  use Ecto.Migration

  def change do
    create table(:folders, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :parent_id, references(:folders, type: :uuid)
      add :deleted, :boolean, default: false
      add :deleted_at, :naive_datetime, null: true
      timestamps()
    end

    alter table(:documents) do
      add :folder_id, references(:folders, type: :uuid)
    end
  end
end
