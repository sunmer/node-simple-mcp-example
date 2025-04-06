# 🛠️ Simple MCP Example with Claude and a Local JSON HTTP Server

This guide walks you through a basic setup where you use **Claude (MacOS desktop)** to interact with a local **mock JSON server** via **MCP (Model-Computer Protocol)**.

---

## 🧰 Prerequisites

- [Node.js](https://nodejs.org/en) installed
- Claude for MacOS (download from [Anthropic](https://www.anthropic.com/index/claude))
- Basic understanding of how local servers and Claude MCP tools work

---

## 🚀 Step-by-Step Setup

### 1. Install Dependencies
In the root of your project, install the required packages:

```bash
npm install
npm run mock-api
npm run mcp-server
````
Edit the claude_desktop_config.json file (usually found in ~/.claude/ or the app's internal config folder), and add your MCP server config:
```
{
  "mcpServers": {
    "json-chat": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-example/dist/index.js"]
    }
  }
}
```

* Restart Claude
* Once restarted, you should see two new MCP tools appear below the input bar in Claude, each marked with a 🛠️ hammer icon:

* Try prompting Claude with something like:
> "get all posts"

> "insert a post with id 500, title "created by claude" and views 123"

Claude will use the MCP tools you've configured to send actual requests to your local mock server.

Make sure you're running the JSON server, MCP server when you prompt Claude.

## Testing
Run 
```
npx @modelcontextprotocol/inspector node build/index.js
```

You should then see all of the available resources at http://127.0.0.1:6274/#resources
