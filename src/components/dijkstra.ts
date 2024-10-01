type Graph = {
  [key: string]: { [key: string]: number };
};

export interface PathResult {
  path: string[];
  distance: number;
}

export function findShortestPath(graph: Graph, start: string, end: string): PathResult | null {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const unvisited: Set<string> = new Set(Object.keys(graph));

  for (const node in graph) {
      distances[node] = Infinity;
      previous[node] = null;
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
      const currentNode = Array.from(unvisited).reduce((minNode, node) => 
          distances[node] < distances[minNode] ? node : minNode
      );

      if (currentNode === end) {
          const path = [];
          let temp: string| null = currentNode;
          while (temp) {
              path.unshift(temp);
              temp = previous[temp];
          }

          // Return the path and its distance
          return {
              path,
              distance: distances[end], // Get the distance to the end node
          };
      }

      unvisited.delete(currentNode);

      for (const neighbor in graph[currentNode]) {
          const newDist = distances[currentNode] + graph[currentNode][neighbor];
          if (newDist < distances[neighbor]) {
              distances[neighbor] = newDist;
              previous[neighbor] = currentNode;
          }
      }
  }

  // Return null if no path is found
  return null;
}
