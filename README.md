Simple MCP example where you use Claude to interact with a local JSON http server file

Run 
* npm install
* npm run mock-api to expose the database you will query & insert mock data against
* npm run mcp-server to start the mcp server which will communicate with the mock database started in the previous step
* install Claude for MacOS desktop
* edit 'claude_desktop_config.json' so that it looks something like this:
{
  "mcpServers": {
    "json-chat": {
      "command": "node",
      "args": ["/path/to/mcp-example/dist/index.js"]
    }
  }
}
* restart claude
* 2 mcp tools should show up below the prompt input bar, with the hammer logo exposing 'post_creation' and 'post_query' as MCP tools
