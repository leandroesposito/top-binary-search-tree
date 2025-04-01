import BinarySearchTree from "./BinarySearchTree.js";

const elements = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const binarySearchTree = new BinarySearchTree(elements);

BinarySearchTree.prettyPrint(binarySearchTree.root);
