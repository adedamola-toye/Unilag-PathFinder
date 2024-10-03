

export interface PathResult {
  path: string[];
  distance: number;
}

type Graph = Map<string, Map<string, number>>;

export interface PathResult {
  path: string[];
  distance: number;
}

export function findShortestPath(graph: Graph, start: string, end: string): PathResult | null {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const unvisited: Set<string> = new Set(Array.from(graph.keys()));

  // Initialize distances and previous nodes
  for (const node of graph.keys()) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    // Find the node with the smallest distance
    const currentNode = Array.from(unvisited).reduce((minNode, node) => 
      distances[node] < distances[minNode] ? node : minNode
    );

    // If we have reached the end node, reconstruct the path
    if (currentNode === end) {
      const path: string[] = [];
      let temp: string | null = currentNode;

      while (temp) {
        path.unshift(temp);
        temp = previous[temp];
      }

      // Return the path and its distance
      return {
        path,
        distance: distances[end],
      };
    }

    // Remove current node from unvisited set
    unvisited.delete(currentNode);

    // Iterate through neighbors of the current node
    const neighbors = graph.get(currentNode);
    if (neighbors) {
      for (const [neighbor, weight] of neighbors.entries()) {
        const newDist = distances[currentNode] + weight;
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          previous[neighbor] = currentNode;
        }
      }
    }
  }

  // Return null if no path is found
  return null;
}

