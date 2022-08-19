import { graphData } from "../templates/graphVertex.templates"
import { Graph } from "../non-linear/Graph"
import { Queue } from "../linear/Queue"
import { Stack } from "../linear/Stack"

export class GraphTraversal {
  public static BFS( action: Function, graph: Graph, vertex: graphData ): void {
    let queue = new Queue<graphData>()
    let result: Array<graphData> = GraphTraversal.traversal( graph, vertex, queue, queue.enqueue.bind( queue ), queue.dequeue.bind( queue ) )
    result.forEach( i => action( i ) )
    // let i: graphData, j: graphData
    // let queue = new Queue<graphData>()
    // let visited = new Array<graphData>()
    //
    // queue.enqueue( vertex )
    // visited.push( vertex )
    //
    // while ( !queue.isEmpty() ) {
    //   i = queue.dequeue()
    //   j = null
    //
    //   do {
    //     j = j !== null ? graph.nextAdjacentVertex( i, j ) : graph.firstAdjacentVertex( i )
    //     if ( j && !visited.includes( j ) ) {
    //       queue.enqueue( j )
    //       visited.push( j )
    //     }
    //   }
    //   while ( j !== null )
    // }
    //
    // visited.forEach( i => action( i ) )
  }

  public static DFS( action: Function, graph: Graph, vertex: graphData ): void {
    let stack = new Stack<graphData>()
    let result: Array<graphData> = GraphTraversal.traversal( graph, vertex, stack, stack.push.bind( stack ), stack.pop.bind( stack ) )
    result.forEach( i => action( i ) )
    // let i: graphData, j: graphData
    // let stack = new Stack<graphData>()
    // let visited = new Array<graphData>()
    //
    // stack.push( vertex )
    // visited.push( vertex )
    //
    // while ( !stack.isEmpty() ) {
    //   i = stack.pop()
    //   j = null
    //
    //   do {
    //     j = j !== null ? graph.nextAdjacentVertex( i, j ) : graph.firstAdjacentVertex( i )
    //     if ( j && !visited.includes( j ) ) {
    //       stack.push( j )
    //       visited.push( j )
    //     }
    //   }
    //   while ( j !== null )
    // }
    //
    // visited.forEach( i => action( i ) )
  }

  private static traversal( graph: Graph, vertex: graphData, structure: Stack<graphData> | Queue<graphData>, add: Function, remove: Function ): Array<graphData> {
    let i: graphData, j: graphData
    let visited = new Array<graphData>()

    add( vertex )
    visited.push( vertex )

    while ( !structure.isEmpty() ) {
      i = remove()
      j = null

      do {
        j = j !== null ? graph.nextAdjacentVertex( i, j ) : graph.firstAdjacentVertex( i )
        if ( j && !visited.includes( j ) ) {
          add( j )
          visited.push( j )
        }
      }
      while ( j )
    }

    return visited
  }
}