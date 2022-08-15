type comparable = number | string
const isComparable = ( data: any ): boolean => typeof data === "number" || typeof data === "symbol"

export class BinarySearchTreeNode<T> {
  constructor(
    readonly data: T,
    public left: BinarySearchTreeNode<T> | null = null,
    public right: BinarySearchTreeNode<T> | null = null
  ) {
  }

  public compareTo( data: T, compare: Function ): number {
    const value: any = compare.call( this, data )
    if ( typeof value === "number" ) {
      return value
    } else {
      throw new Error( "Invalid type returned by the function" )
    }
  }
}