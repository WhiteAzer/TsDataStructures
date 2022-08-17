import { BinarySearchTreeNode } from "../templates/binaryTreeNode.templates"
import { BinaryTreeTraversal } from "../services/BinaryTreeTraversal.service";

interface IBinarySearchTree<T> {
  add( data: T ): void

  includes( data: T ): boolean

  remove( data: T ): void

  removeAll(): void

  getLength(): number

  isEmpty(): boolean
}

export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  protected _root: BinarySearchTreeNode<T> | null = null
  private _compare: Function
  private _length: number = 0

  constructor( compare?: Function ) {
    this._compare = compare || defaultCompare
  }

  add( data: T ): void {
    if ( !this._root ) {
      this._root = new BinarySearchTreeNode( data )
    } else {
      this.addVertex( this._root, data )
    }
    this._length++
  }

  getLength(): number {
    return this._length
  }

  includes( data: T ): boolean {
    return !!this.findWithParent(data)[1]
  }

  remove( data: T ): void {
    let current: BinarySearchTreeNode<T>
    let parent: BinarySearchTreeNode<T>

    [ parent, current ] = this.findWithParent( data )

    if ( !current ) {
      return
    }

    this._length--

    if ( !current.right ) {
      if ( !parent ) {
        this._root = current.left
      } else {
        let result: number = parent.compareTo( current.data, this._compare )
        if ( result > 0 ) {
          parent.left = current.left
        } else if ( result < 0 ) {
          parent.right = current.left
        }
      }
      return
    }
    else if ( current.right.left == null ) {
      current.right.left = current.left
      if ( parent === null ) {
        this._root = current.right
      } else {
        let result: number = parent.compareTo( current.data, this._compare )
        if ( result > 0 ) {
          parent.left = current.right
        } else if ( result < 0 ) {
          parent.right = current.right
        }
      }
    }
    else {
      let farLeft: BinarySearchTreeNode<T> = current.right.left
      let farLeftParent: BinarySearchTreeNode<T> = current.right

      while ( farLeft.left ) {
        farLeftParent = farLeft
        farLeft = farLeft.left
      }

      farLeftParent.left = farLeft.right
      farLeft.left = current.left

      farLeft.right = current.right
      if ( !parent  ) {
        this._root = farLeft
      } else {
        let result: number = parent.compareTo( current.data, this._compare )
        if ( result > 0 ) {
          parent.left = farLeft
        } else if ( result < 0 ) {
          parent.right = farLeft
        }
      }
    }
  }

  removeAll(): void {
    this._root = null
    this._length = 0
  }

  public preOrderTraversal(action: Function): void {
    BinaryTreeTraversal.preOrder(action, this._root)
  }

  public postOrderTraversal(action: Function): void {
    BinaryTreeTraversal.postOrder(action, this._root)
  }

  public inOrderTraversal(action: Function): void {
    BinaryTreeTraversal.inOrder(action, this._root)
  }

  public isEmpty(): boolean {
    return !this._root
  }

  private addVertex( node: BinarySearchTreeNode<T>, data: T ): void {
    if ( node.compareTo( data, this._compare ) > 0 ) {
      if ( node.left == null ) {
        node.left = new BinarySearchTreeNode( data )
      } else {
        this.addVertex( node.left, data )
      }
    } else {
      if ( node.right == null ) {
        node.right = new BinarySearchTreeNode( data )
      } else {
        this.addVertex( node.right, data )
      }
    }
  }

  private findWithParent( data: T ): BinarySearchTreeNode<T>[] {
    let current: BinarySearchTreeNode<T> = this._root
    let parent: BinarySearchTreeNode<T> | null

    while ( current != null ) {
      let result: number = current.compareTo( data, this._compare )

      if ( result > 0 ) {
        parent = current
        current = current.left
      } else if ( result < 0 ) {
        parent = current
        current = current.right
      } else {
        break
      }
    }

    return [ parent, current ]
  }
}

type comparable = number | string

function defaultCompare( data: comparable ): number {
  if ( this.data > data ) {
    return 1
  } else if ( this.data < data ) {
    return -1
  } else {
    return 0
  }
}