interface IBinaryHeap<T> {
  add( data: T ): BinaryHeap<T>

  removeMax(): T | null

  getMax(): T | null

  getLength(): number

  isEmpty(): boolean
}

export class BinaryHeap<T> implements IBinaryHeap<T> {
  private _array: Array<T> = []

  constructor( array?: Array<T> ) {
    if ( array ) {
      this._array = array

      for ( let i: number = Math.floor( array.length / 2 ); i >= 0; i-- ) {
        this.heapify( i )
      }
    }
  }

  public add( data: T ): BinaryHeap<T> {
    this._array.push( data )

    let current: number = this._array.length - 1
    let parent: number = Math.floor( (current - 1) / 2 )

    while ( current > 0 && this._array[ current ] > this._array[ parent ] ) {
      this.swapElements( current, parent )

      current = parent
      parent = Math.floor( (current - 1) / 2 )
    }

    return this
  }

  public getMax(): T | null {
    return this._array[ 0 ] || null
  }

  public getLength(): number {
    return this._array.length
  }

  public isEmpty(): boolean {
    return this._array.length === 0
  }

  public removeMax(): T | null {
    let max: T = this._array[ 0 ]
    this._array[ 0 ] = this._array[ this.getLength() - 1 ]
    this._array.pop()

    this.heapify( 0 )

    return max
  }

  private heapify( index: number ): void {
    let left: number
    let right: number
    let parent: number

    while ( true ) {
      left = 2 * index + 1
      right = 2 * index + 2
      parent = index

      if ( left < this.getLength() && this._array[ left ] > this._array[ parent ] ) {
        parent = left
      }

      if ( right < this.getLength() && this._array[ right ] > this._array[ parent ] ) {
        parent = right
      }

      if ( parent === index ) {
        break
      }

      this.swapElements( index, parent )

      index = parent
    }
  }

  private swapElements( firstIndex: number, secondIndex: number ): void {
    let currentItem: T = this._array[ firstIndex ]
    this._array[ firstIndex ] = this._array[ secondIndex ]
    this._array[ secondIndex ] = currentItem
  }
}