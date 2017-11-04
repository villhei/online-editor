defmodule OnlineEditor.Document do
  @moduledoc """
  The text editor document schema. Used for everything in the frontend
  """
  use OnlineEditor.Schema
  import Ecto.Changeset
  alias OnlineEditor.Document

  schema "documents" do
    field :content, :string
    field :name, :string
    field :owner, :string

    timestamps()
  end

  @doc false
  def changeset(%Document{} = document, attrs) do
    document
    |> cast(attrs, [:name, :owner, :content])
    |> validate_required([:name, :owner, :content])
  end
end
