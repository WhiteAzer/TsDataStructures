import { LinkedList } from "./LinkedList"

interface IDeque<T> {
  getLength(): number

  enqueueFirst( data: T ): void

  enqueueLast( data: T ): void

  dequeueFirst(): T

  dequeueLast(): T

  isEmpty(): boolean

  peekFirst(): T | null

  peekFLast(): T | null
}

export class Deque<T> implements IDeque<T> {
  private _list: LinkedList<T>

  constructor( list?: LinkedList<T> ) {
    this._list = list || new LinkedList<T>()
  }

  [ Symbol.iterator ]() {
    return this._list[ Symbol.iterator ]()
  }

  dequeueFirst(): T {
    return this._list.removeFirst()
  }

  dequeueLast(): T {
    return this._list.removeLast()
  }

  enqueueFirst( data: T ): void {
    this._list.prepend( data )
  }

  enqueueLast( data: T ): void {
    this._list.append( data )
  }

  getLength(): number {
    return this._list.getLength()
  }

  isEmpty(): boolean {
    return this._list.isEmpty()
  }

  peekFLast(): T | null {
    return this.isEmpty() ? null : this._list.toArray()[ this.getLength() - 1 ]
  }

  peekFirst(): T | null {
    return this.isEmpty() ? null : this._list.toArray()[ 0 ]
  }

}