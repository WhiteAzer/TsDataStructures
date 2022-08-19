import { LinkedList } from "../linear/LinkedList"
import { graphData, Vertex } from "../templates/graphVertex.templates"
import { GraphTraversal } from "../services/GraphTraversal.service";

interface IGraph {
  addVertex( data: graphData ): Graph

  addArc( from: graphData, to: graphData, weight: number ): Graph

  removeVertex( data: graphData ): Graph

  removeArc( from: graphData, to: graphData ): Graph

  merge( i: graphData, j: graphData ): Graph

  getAdjacency( vertex: graphData ): LinkedList<Vertex>

  isAdjacency( i: graphData, j: graphData ): boolean

  nextAdjacentVertex( i: graphData, j: graphData ): graphData

  BFS( action: Function, vertex: graphData ): void

  DFS( action: Function, vertex: graphData ): void
}

export class Graph implements IGraph {
  private _graph: object = {}
  private _vertexes: Set<graphData> = new Set<graphData>()

  public addVertex( data: graphData ): Graph {
    if ( !this._vertexes.has( data ) ) {
      this._graph[ data ] = new LinkedList()
      this._vertexes.add( data )
    }
    return this
  }

  public addArc( from: graphData, to: graphData, weight: number ): Graph {
    if ( !this._vertexes.has( from ) || !this._vertexes.has( to ) ) throw new Error( "This vertex does not exist" )

    if ( from === to ) throw new Error( "The same vertex" )

    this.removeArc( from, to )

    this._graph[ from ].append( new Vertex( to, weight ) )
    this._graph[ to ].append( new Vertex( from, weight ) )

    return this
  }

  public removeVertex( data: graphData ): Graph {
    if ( !this._vertexes.delete( data ) ) throw new Error( "This vertex does not exist" )

    delete this._graph[ data ]

    for ( let key in this._graph ) {
      this._graph[ key ] = new LinkedList( this._graph[ key ].toArray().filter( i => i.to !== data ) )
    }
    return this
  }

  public removeArc( from: graphData, to: graphData ): Graph {
    if ( this._vertexes.has( from ) && this._vertexes.has( to ) ) {
      this._graph[ from ] = new LinkedList( this._graph[ from ].toArray().filter( i => i.to !== to ) )
      this._graph[ to ] = new LinkedList( this._graph[ to ].toArray().filter( i => i.to !== from ) )
    } else {
      throw new Error( "This vertex does not exist" )
    }

    return this
  }

  public merge( i: graphData, j: graphData ): Graph {
    if ( !this._vertexes.has( i ) || !this._vertexes.has( j ) ) throw new Error( "This vertex does not exist" )

    let jAdjacencyList: Array<Vertex> = this._graph[ j ].toArray()

    jAdjacencyList.forEach( vertex => {
        if ( vertex.to !== i ) this.addArc( i, vertex.to, vertex.weight )
      }
    )

    this.removeVertex( j )

    return this
  }

  public getAdjacency( vertex: graphData ): LinkedList<Vertex> {
    if ( !this._vertexes.has( vertex ) ) throw new Error( "This vertex does not exist" )

    return this._graph[ vertex ]
  }

  public isAdjacency( i: graphData, j: graphData ): boolean {
    if ( !this._vertexes.has( i ) || !this._vertexes.has( j ) ) throw new Error( "This vertex does not exist" )

    return  this._graph[i].toArray().reduce((prev, current) => prev || current.to === j, false)
  }

  public nextAdjacentVertex( i: graphData, j: graphData ): graphData {
    if ( !this._vertexes.has( i ) || !this._vertexes.has( j ) ) return null

    let item: Vertex = this._graph[i].toArray().find((item, index, array) => array[index - 1]  && array[index - 1].to === j)

    return item && item.to
  }

  public firstAdjacentVertex( vertex: graphData ): graphData {
    if ( !this._vertexes.has( vertex ) ) throw new Error( "This vertex does not exist" )

    let item: Vertex = this._graph[vertex].toArray()[0]

    return item && item.to
  }

  public BFS( action: Function, vertex: graphData ): void {
    GraphTraversal.BFS.call(this, action, this, vertex)
  }

  public DFS( action: Function, vertex: graphData ): void {
    GraphTraversal.DFS(action, this, vertex)
  }
}