defmodule :"Elixir.OnlineEditor.Repo.Migrations.Add-not-nulls" do
  use Ecto.Migration

  def change do
    alter table(:documents) do
      modify(:id, :uuid, null: false)
      modify(:name, :text, null: false, default: "unknown")
      modify(:content, :text, null: false, default: "")
    end

    alter table(:folders) do
      modify(:id, :uuid, null: false)
      modify(:name, :string, null: false, default: "unknown")
    end
  end
end
