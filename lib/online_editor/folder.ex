defmodule OnlineEditor.Folder do
  use OnlineEditor.Schema
  import Ecto.Changeset
  alias OnlineEditor.Document
  alias OnlineEditor.Folder
  alias OnlineEditor.Repo

  schema "folders" do
    field(:name, :string)
    field(:deleted, :boolean)
    field(:deleted_at, :naive_datetime)
    has_many(:documents, Document, foreign_key: :folder_id)
    has_many(:children, Folder, foreign_key: :parent_id)
    belongs_to(:parent, Folder)
    timestamps()
  end

  @doc false
  def changeset(%Folder{} = folder, %{"parent" => parent_id} = attrs) do
    with_parent_id =
      attrs
      |> Map.drop(["parent"])
      |> Map.put("parent_id", parent_id)
    changeset(folder, with_parent_id)
  end

  def changeset(%Folder{} = folder, attrs) do
    folder
    |> change(%{})
    |> Map.put(:empty_values, [""])
    |> cast(attrs, [:name, :parent_id])
    |> validate_required([:name])
  end

  def load_children(%Folder{} = model) do
    model |> Repo.preload(:children)
  end
end
