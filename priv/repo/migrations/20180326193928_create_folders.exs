defmodule OnlineEditor.Repo.Migrations.CreateFolders do
  use Ecto.Migration
  import Ecto.Query
  alias OnlineEditor.Repo
  alias OnlineEditor.Folder

  def up do
    create table(:folders, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :name, :string
      add :parent_id, references(:folders, type: :uuid)
      add :deleted, :boolean, default: false
      add :deleted_at, :naive_datetime, null: true
      timestamps()
    end

    flush()

    root = Repo.insert!(%Folder{
      name: "Root"
    })

    root_id = root.id

    alter table(:documents) do
      add :folder_id, references(:folders, type: :uuid)
    end

    flush()

    from(d in "documents",
      update: [set: [folder_id: type(^root_id, :binary_id)]])
    |> Repo.update_all([])
  end

  def down do
    drop_if_exists table(:folders)

    alter table(:documentd) do
      remove :folder_id
    end
  end
end
