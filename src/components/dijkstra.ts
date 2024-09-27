
export interface Location {
    id: string;
    coordinates: [number, number]; // [latitude, longitude]
    neighbours: { id: string; distance: number }[];
  }
  
  export type Graph = { [key: string]: Location };

export class PriorityQueue {
    private collection: [string, number][] = [];
  
    enqueue(element: [string, number]) {
      if (this.isEmpty()) {
        this.collection.push(element);
      } else {
        let added = false;
        for (let i = 0; i < this.collection.length; i++) {
          if (element[1] < this.collection[i][1]) {
            this.collection.splice(i, 0, element);
            added = true;
            break;
          }
        }
        if (!added) {
          this.collection.push(element);
        }
      }
    }
  
    dequeue(): [string, number] {
      return this.collection.shift()!;
    }
  
    isEmpty(): boolean {
      return this.collection.length === 0;
    }
  }

  export function dijkstra(graph: Graph, startId: string, endId: string): { path: string[], distance: number } {
    const distances: { [key: string]: number } = {};
    const previous: { [key: string]: string | null } = {};
    

    for (const loc in graph) {
      distances[loc] = Infinity;
      previous[loc] = null;
    }
    distances[startId] = 0;
  

    const pq = new PriorityQueue();
    pq.enqueue([startId, 0]);
  
    while (!pq.isEmpty()) {
      const [currentId, currentDistance] = pq.dequeue();
      const currentLocation = graph[currentId];
  
      if (currentId === endId) break; // Reached destination
  
      for (const neighbour of currentLocation.neighbours) {
        const neighbourId = neighbour.id;
        const distanceToneighbour = neighbour.distance;
        const totalDistance = currentDistance + distanceToneighbour;
  
        if (totalDistance < distances[neighbourId]) {
          distances[neighbourId] = totalDistance;
          previous[neighbourId] = currentId;
          pq.enqueue([neighbourId, totalDistance]);
        }
      }
    }
  
    // shortest path
    const path: string[] = [];
    let current = endId;
    while (previous[current]) {
      path.unshift(current);
      current = previous[current]!;
    }
    if (current === startId) path.unshift(startId);
  
    return { path, distance: distances[endId] };
  }
  