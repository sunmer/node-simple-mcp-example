#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { PostCreationArgs, queryTool, createTool } from "./mock-db/query.js";
import { mockDBClient } from "./mock-db/client.js";

const server = new Server(
  {
    name: "mock-db-model-context-protocol-server",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [queryTool, createTool],
  };
});

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest) => {
    try {
      if (!request.params.arguments) {
        throw new Error("Arguments are required");
      }

      switch (request.params.name) {

        case "post_query": {
          const response = await mockDBClient.getPosts();
          return {
            content: [{ type: "text", text: JSON.stringify(response) }],
          };
        }

        case "post_creation": {
          const args = request.params.arguments as unknown as PostCreationArgs;
          if (!args.id || !args.title || !args.views) {
            throw new Error("Missing required arguments");
          }
          const response = await mockDBClient.createPost(
            args.id,
            args.title,
            args.views
          );
          return {
            content: [{ type: "text", text: JSON.stringify(response) }],
          };
        }

        default:
          throw new Error(`Unknown tool: ${request.params.name}`);
      }
    } catch (error) {
      console.error("Error executing tool:", error);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            }),
          },
        ],
      };
    }
  }
);

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Mock DB MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});