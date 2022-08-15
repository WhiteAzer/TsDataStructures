import { LinkedList } from "./linear/LinkedList"
import { Stack } from "./linear/Stack"
import { Queue } from "./linear/Queue"
import { Deque } from "./linear/Deque"
import { BinarySearchTreeNode } from "./templates/binaryTreeNode.templates"
import { BinarySearchTree } from "./non-linear/BinarySearchTree";

let binaryTree = new BinarySearchTree()

binaryTree.add( 6 )
binaryTree.add( 4 )
binaryTree.add( 1 )
binaryTree.add( 2 )
binaryTree.add( 3 )
binaryTree.add( 5 )
binaryTree.add( 9 )
binaryTree.add( 7 )
binaryTree.add( 11 )
binaryTree.add( 12 )

binaryTree.postOrderTraversal( i => console.log( i.data ) )