import { LinkedList } from "./LinkedList"

interface IStack<T> {
  getLength(): number

  push( val: T ): void

  pop(): T

  isEmpty(): boolean

  peek(): T | null
}

export class Stack<T> implements IStack<T> {
  private _list: LinkedList<T>

  constructor( list?: LinkedList<T> ) {
    this._list = list || new LinkedList<T>()
  }

  [ Symbol.iterator ]() {
    return this._list[ Symbol.iterator ]()
  }

  public getLength(): number {
    return this._list.getLength()
  }

  public pop(): T {
    return this._list.removeLast()
  }

  public push( data: T ): void {
    this._list.append( data )
  }

  public peek(): T | null {
    return this.isEmpty() ? null : this._list.toArray()[ this.getLength() - 1 ]
  }

  public isEmpty(): boolean {
    return this._list.isEmpty()
  }

}