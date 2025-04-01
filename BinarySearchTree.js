import BinarySearchTreeNode from "./BinarySearchTreeNode.js";

export default class BinarySearchTree {
  constructor(elements) {
    this.root = BinarySearchTree.buildTree(elements);
  }

  static buildTree(elements) {
    const sortedArray = BinarySearchTree.sortArray([...new Set(elements)]);
    const start = 0;
    const end = sortedArray.length - 1;

    return BinarySearchTree.buildTreeRecursive(sortedArray, start, end);
  }

  static sortArray(array) {
    if (array.length === 1) {
      return array;
    }

    const mid = Math.floor(array.length / 2);
    const sortedLeft = BinarySearchTree.sortArray(array.slice(0, mid));
    const sortedRight = BinarySearchTree.sortArray(array.slice(mid));

    const merged = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < sortedLeft.length && rightIndex < sortedRight.length) {
      if (sortedLeft[leftIndex] < sortedRight[rightIndex]) {
        merged.push(sortedLeft[leftIndex]);
        leftIndex++;
      } else {
        merged.push(sortedRight[rightIndex]);
        rightIndex++;
      }
    }

    for (let i = leftIndex; i < sortedLeft.length; i++) {
      merged.push(sortedLeft[i]);
    }
    for (let i = rightIndex; i < sortedRight.length; i++) {
      merged.push(sortedRight[i]);
    }

    return merged;
  }

  static buildTreeRecursive(array, start, end) {
    if (end < start) {
      return null;
    }

    const mid = start + Math.floor((end - start) / 2);

    const root = new BinarySearchTreeNode(array[mid]);
    root.left = this.buildTreeRecursive(array, start, mid - 1);
    root.right = this.buildTreeRecursive(array, mid + 1, end);

    return root;
  }

  static prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      BinarySearchTree.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      BinarySearchTree.prettyPrint(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }
}
