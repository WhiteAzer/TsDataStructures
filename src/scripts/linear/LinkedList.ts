import { Node } from "../templates/node.templates"
import * as _ from "lodash";

interface ILinkedList<T> {
  append( data: T ): void

  prepend( data: T ): void

  addAt( index: number, data: T ): void

  remove( data: T ): void

  removeFirst(): T | null

  removeLast(): T | null

  removeAt( index: number ): T | null

  toArray(): T[]

  getLength(): number

  removeAll(): void

  includes( data: T ): boolean

  isEmpty(): boolean
}

export class LinkedList<T> implements ILinkedList<T> {
  private _head: Node<T> | null = null
  private _tail: Node<T> | null = null

  constructor( array?: Array<T> ) {
    if ( array ) {
      array.reduce( ( prev: Node<T>, current: T ) => {
        const node = new Node<T>( current )
        if ( !prev ) {
          this._head = node
          this._tail = node
        } else {
          node.prev = prev
          prev.next = node
          this._tail = node
        }

        return this._tail
      }, null )
    }
  }

  * [ Symbol.iterator ]() {
    let current = this._head
    while ( current ) {
      yield current.data
      current = current.next
    }
  }

  public append( data: T ): void {
    let node = new Node( data )

    if ( !this._head ) {
      this._head = node
      this._tail = node
    } else {
      node.prev = this._tail
      this._tail.next = node
      this._tail = node
    }
  }

  public prepend( data: T ): void {
    let node = new Node( data )

    if ( !this._head ) {
      this._head = node
      this._tail = node
    } else {
      node.next = this._head
      this._head.prev = node
      this._head = node
    }
  }

  public addAt( index: number, data: T ): void {
    let length: number = this.getLength()

    if ( index === 0 ) {
      this.prepend( data )
    } else if ( index === length ) {
      this.append( data )
    } else {
      let current: Node<T> = this.findByIndex( index )
      if ( !current ) return

      let node = new Node( data, current.prev, current )

      current.prev.next = node
      current.prev = node
    }
  }

  public remove( data: T, isAll: boolean = false ): void {
    let current: Node<T> = this.find( data )

    while ( current ) {
      this.removeNode( current )

      if ( !isAll ) return

      current = this.find( data )
    }
  }

  public removeFirst(): T | null {
    return !this.isEmpty() ? this.removeNode( this._head ) : null
  }

  public removeLast(): T | null {
    return !this.isEmpty() ? this.removeNode( this._tail ) : null
  }

  public removeAll(): void {
    this._head = null
    this._tail = null
  }

  public removeAt( index: number ): T | null {
    let current: Node<T> = this.findByIndex( index )

    if ( current ) {
      this.removeNode( current )
      return current.data
    }
  }

  public includes( data: T ): boolean {
    return !!this.find( data )
  }

  public isEmpty(): boolean {
    return !(this._head && this._head.data)
  }

  public getLength(): number {
    return this.toArray().length;
  }

  public toArray(): T[ ] {
    const array: Array<T> = []

    if ( !this._head ) return array

    const pushToArray = ( node: Node<T> ): Array<T> => {
      array.push( node.data )
      return node.next ? pushToArray( node.next ) : array
    }

    return pushToArray( this._head );
  }

  private find( data: T ): Node<T> | null {
    let current = this._head

    while ( current ) {
      if ( _.isEqual( current.data, data ) ) {
        return current
      }
      current = current.next
    }

    return null
  }

  private findByIndex( index: number ): Node<T> | null {
    const length = this.getLength()

    if ( length <= index || index < 0 ) return null

    let current: Node<T>

    if ( index <= length / 2 ) {
      current = this._head

      while ( index > 0 ) {
        current = current.next
        index--
      }
    } else {
      current = this._tail

      while ( length > index + 1 ) {
        current = current.prev
        index++
      }
    }

    return current
  }

  private removeNode( node: Node<T> ): T {
    if ( !node.prev && !node.next ) {
      this.removeAll()
    } else if ( !node.prev ) {
      this._head = node.next
      this._head.prev = null
    } else if ( !node.next ) {
      this._tail = node.prev
      this._tail.next = null
    } else {
      node.prev.next = node.next
      node.next.prev = node.prev
    }

    return node.data
  }
}