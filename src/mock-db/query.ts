import { Tool } from "@modelcontextprotocol/sdk/types.js";

export interface PostCreationArgs {
  id: string;
  title: string;
  views: number;
}

export const createTool: Tool = {
  name: "post_creation",
  description: "Mock DB tool for creating posts",
  inputSchema: {
    type: "object",
    required: ["id", "title", "views"],
    properties: {
      id: {
        type: "string",
        description: "id of the entry",
      },
      title: {
        title: "string",
        description: "title of the entry",
      },
      views: {
        type: "number",
        description: "number of views for the entry",
      },
    },
  },
};

export const queryTool: Tool = {
  name: "post_query",
  description: "Mock DB tool for querying posts",
  inputSchema: {
    type: "object",
    required: []
  },
};