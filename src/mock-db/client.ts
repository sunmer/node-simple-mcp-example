const API_URL = 'http://localhost:3000'

class MockDBClient {
  async createPost(id: string, title: string, views: number) {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer xyz`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        title: title,
        views: views,
      }),
    });

    if (!response.ok) {
      throw new Error(`Mock DB API error: ${response.statusText}`);
    }

    return response.json();
  }
  
  async getPosts() {
    const response = await fetch(`${API_URL}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer xyz`,
        "Content-Type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Mock DB API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const mockDBClient = new MockDBClient();