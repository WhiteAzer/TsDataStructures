import { LinkedList } from "./LinkedList"

interface IStack<T> {
  getLength(): number

  push( val: T ): void

  pop(): T

  isEmpty(): boolean

  peek(): T | null
}

export class Stack<T> implements IStack<T> {
  private list: LinkedList<T>

  constructor( list?: LinkedList<T> ) {
    this.list = list || new LinkedList<T>()
  }

  [ Symbol.iterator ]() {
    return this.list[ Symbol.iterator ]()
  }

  public getLength(): number {
    return this.list.getLength()
  }

  public pop(): T {
    return this.list.removeLast()
  }

  public push( data: T ): void {
    this.list.append( data )
  }

  public peek(): T | null {
    return this.isEmpty() ? null : this.list.toArray()[ this.getLength() - 1 ]
  }

  public isEmpty(): boolean {
    return this.list.isEmpty()
  }

}