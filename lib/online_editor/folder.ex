defmodule OnlineEditor.Folder do
  use OnlineEditor.Schema
  import Ecto.Changeset
  alias OnlineEditor.Folder
  alias OnlineEditor.Document

  schema "folders" do
    field :name, :string
    field :parent, :string
    field :deleted, :boolean
    field :deleted_at, :naive_datetime
    has_many :documents, Document
    timestamps()
  end

  @doc false
  def changeset(%Folder{} = folder, attrs) do
    folder
    |> change(%{})
    |> Map.put(:empty_values, [""])
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
