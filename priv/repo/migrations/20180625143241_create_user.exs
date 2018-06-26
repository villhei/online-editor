defmodule OnlineEditor.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add(:id, :uuid, primary_key: true)
      add(:email, :string, null: false)
      add(:auth_provider, :string, null: false)
      add(:first_name, :string, null: false)
      add(:last_name, :string, null: false)
      add(:avatar, :string)
      add(:deleted, :boolean, default: false)
      add(:deleted_at, :naive_datetime, null: true)
      timestamps()
    end

    create(index(:users, [:email], unique: true))
  end
end
