import { LinkedList } from "./LinkedList"

interface IQueue<T> {
  enqueue( data: T ): void

  dequeue(): T

  isEmpty(): boolean

  peek(): T | null

  getLength(): number
}

export class Queue<T> implements IQueue<T> {
  private _list: LinkedList<T>

  constructor( list?: LinkedList<T> ) {
    this._list = list || new LinkedList<T>()
  }

  [ Symbol.iterator ]() {
    return this._list[ Symbol.iterator ]()
  }

  dequeue(): T {
    return this._list.removeFirst()
  }

  enqueue( data: T ): void {
    this._list.append( data )
  }

  peek(): T | null {
    return this.isEmpty() ? null : this._list.toArray()[ 0 ]
  }

  getLength(): number {
    return  this._list.getLength()
  }

  isEmpty(): boolean {
    return this._list.isEmpty()
  }

}