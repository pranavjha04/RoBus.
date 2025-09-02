<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Right Sidebar Layout</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
    />
    <style>
      body,
      html {
        height: 100%;
      }
      aside {
        width: 350px; /* fixed width */
      }
    </style>
  </head>
  <body class="d-flex">
    <!-- Main content -->
    <main class="flex-grow-1 p-4">
      <h1>Main Content</h1>
      <p>This is your main content area.</p>
    </main>

    <!-- Always-visible Sidebar -->
    <aside class="p-3 border">
      <h4>Sidebar</h4>
      <ul class="list-unstyled">
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
      </ul>
    </aside>
  </body>
</html>
