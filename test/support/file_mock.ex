defmodule OnlineEditorWeb.Test.FileMock do

  @index Application.app_dir(:online_editor, "/priv/static/index.html")

  def read!(@index) do
    """
    <html>
      <title>app_title</h1>
      <h1>Foo</h1>
    </head>
    """
  end

  def read(p) do
    {:error, {
      :enoent, p
    }}
  end
end