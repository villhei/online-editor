defmodule :"Elixir.OnlineEditor.Repo.Migrations.Add-starred-to-documents" do
  use Ecto.Migration

  def change do
    alter table(:documents) do
      add(:starred, :boolean, null: false, default: false)
    end
  end
end
