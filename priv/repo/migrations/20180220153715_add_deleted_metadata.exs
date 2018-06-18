defmodule OnlineEditor.Repo.Migrations.AddDeletedMetadata do
  use Ecto.Migration

  def change do
    alter table(:documents) do
      add(:deleted, :boolean, default: false)
      add(:deleted_at, :naive_datetime, null: true)
    end
  end
end
