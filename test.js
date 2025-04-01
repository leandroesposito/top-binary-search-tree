import BinarySearchTree from "./BinarySearchTree.js";

function insertAndPrint(binarySearchTree, data) {
  const [parent, node] = BinarySearchTree.findParentAndNodeOf(
    binarySearchTree.root,
    data
  );
  console.log("parent of", data, "is", parent, "current is", node);
  binarySearchTree.insert(data);
  BinarySearchTree.prettyPrint(binarySearchTree.root);
}

function removeAndPrint(binarySearchTree, data) {
  console.log("before");
  BinarySearchTree.prettyPrint(binarySearchTree.root);
  console.log("after removing", data);
  binarySearchTree.deleteItem(data);
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

removeAndPrint(binarySearchTree, 8);
removeAndPrint(binarySearchTree, 67);
removeAndPrint(binarySearchTree, 324);
removeAndPrint(binarySearchTree, 9);
removeAndPrint(binarySearchTree, 4);
removeAndPrint(binarySearchTree, 23);
removeAndPrint(binarySearchTree, 6345);
removeAndPrint(binarySearchTree, 200);
