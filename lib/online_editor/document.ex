defmodule OnlineEditor.Document do
  @moduledoc """
  The text editor document schema. Used for everything in the frontend
  """
  use Ecto.Schema
  import Ecto.Changeset
  alias OnlineEditor.Document

  schema "documents" do
    field :content, :string
    field :created, :date
    field :name, :string
    field :owner, :string
    field :updated, :date

    timestamps()
  end

  @doc false
  def changeset(%Document{} = document, attrs) do
    document
    |> cast(attrs, [:name, :owner, :created, :updated, :content])
    |> validate_required([:name, :owner, :created, :updated, :content])
  end
end
