defmodule OnlineEditorWeb.Test.FileMock do

  def read!("priv/static/index.html") do
    """
    <html>
      <title>app_title</h1>
      <h1>Foo</h1>
    </head>
    """
  end

  def read!("priv/static/js/app.js") do
    """
    const jsContent = 'awesome js'
    """
  end

  def read("priv/static/css/style.css") do
    file = """
    body {
      background: black;
    }
    """
    {:ok, file}
  end

  def read(_) do
    {:error, :enoent}
  end
end