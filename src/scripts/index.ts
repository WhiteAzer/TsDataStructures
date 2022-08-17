import { LinkedList } from "./linear/LinkedList"
import { Stack } from "./linear/Stack"
import { Queue } from "./linear/Queue"
import { Deque } from "./linear/Deque"
import { BinarySearchTreeNode } from "./templates/binaryTreeNode.templates"
import { BinarySearchTree } from "./non-linear/BinarySearchTree"
import { BinaryHeap } from "./non-linear/BinaryHeap"

let heap = new BinaryHeap( [ 18, 6, 12, 3, 15, 9, 21] )

console.log( heap.removeMax() )
console.log( heap )