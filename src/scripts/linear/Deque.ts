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
  private list: LinkedList<T>

  constructor( list?: LinkedList<T> ) {
    this.list = list || new LinkedList<T>()
  }

  [ Symbol.iterator ]() {
    return this.list[ Symbol.iterator ]()
  }

  dequeueFirst(): T {
    return this.list.removeFirst()
  }

  dequeueLast(): T {
    return this.list.removeLast()
  }

  enqueueFirst( data: T ): void {
    this.list.prepend( data )
  }

  enqueueLast( data: T ): void {
    this.list.append( data )
  }

  getLength(): number {
    return this.list.getLength()
  }

  isEmpty(): boolean {
    return this.list.isEmpty()
  }

  peekFLast(): T | null {
    return this.isEmpty() ? null : this.list.toArray()[ this.getLength() - 1 ]
  }

  peekFirst(): T | null {
    return this.isEmpty() ? null : this.list.toArray()[ 0 ]
  }

}