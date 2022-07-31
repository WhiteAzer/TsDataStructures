import { LinkedList } from "./LinkedList"

interface IQueue<T> {
  enqueue( data: T ): void

  dequeue(): T

  isEmpty(): boolean

  peek(): T | null

  getLength(): number
}

export class Queue<T> implements IQueue<T> {
  private list: LinkedList<T>

  constructor( list?: LinkedList<T> ) {
    this.list = list || new LinkedList<T>()
  }

  [ Symbol.iterator ]() {
    return this.list[ Symbol.iterator ]()
  }

  dequeue(): T {
    return this.list.removeFirst()
  }

  enqueue( data: T ): void {
    this.list.append( data )
  }

  peek(): T | null {
    return this.isEmpty() ? null : this.list.toArray()[ 0 ]
  }

  getLength(): number {
    return  this.list.getLength()
  }

  isEmpty(): boolean {
    return this.list.isEmpty()
  }

}