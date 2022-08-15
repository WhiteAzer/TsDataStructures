import { BinarySearchTreeNode } from "../templates/binaryTreeNode.templates"

export class BinaryTreeTraversal {
  public static preOrder( action: Function, node: BinarySearchTreeNode<any> ): void {
    if ( node ) {
      action( node )
      this.preOrder( action, node.left )
      this.preOrder( action, node.right )
    }
  }

  public static postOrder( action: Function, node: BinarySearchTreeNode<any> ): void {
    if ( node ) {
      this.postOrder( action, node.left )
      this.postOrder( action, node.right )
      action( node )
    }
  }

  public static inOrder( action: Function, node: BinarySearchTreeNode<any> ): void {
    if ( node ) {
      this.inOrder( action, node.left )
      action( node );
      this.inOrder( action, node.right )
    }
  }
}