import BinarySearchTree from "./BinarySearchTree.js";

function insertAndPrint(binarySearchTree, data) {
  binarySearchTree.insert(data);
  BinarySearchTree.prettyPrint(binarySearchTree.root);
}

const elements = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const binarySearchTree = new BinarySearchTree(elements);

BinarySearchTree.prettyPrint(binarySearchTree.root);

insertAndPrint(binarySearchTree, 50);
insertAndPrint(binarySearchTree, 75);
insertAndPrint(binarySearchTree, 10);
insertAndPrint(binarySearchTree, 20);
insertAndPrint(binarySearchTree, 10);
