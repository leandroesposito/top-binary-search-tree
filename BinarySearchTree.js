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

  static findParentAndNodeOf(root, data) {
    let parent = null;
    let curr = root;

    while (curr) {
      if (data < curr.data) {
        parent = curr;
        curr = curr.left;
      } else if (data > curr.data) {
        parent = curr;
        curr = curr.right;
      } else {
        break;
      }
    }

    return [parent, curr];
  }

  static findParent(root, data) {
    const [parent, node] = BinarySearchTree.findParentAndNodeOf(root, data);
    return parent;
  }

  insert(data) {
    const [parent, node] = BinarySearchTree.findParentAndNodeOf(
      this.root,
      data
    );
    if (node) {
      return;
    }

    const newNode = new BinarySearchTreeNode(data);

    if (data < parent.data) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }

  static insertNode(tree, node) {
    if (!node) {
      return;
    }

    const parent = BinarySearchTree.findParent(tree, node.data);

    if (parent.data < node.data) {
      parent.right = node;
    } else {
      parent.left = node;
    }
  }

  static replaceNode(parent, node, replacementNode) {
    if (parent.left === node) {
      parent.left = replacementNode;
    } else {
      parent.right = replacementNode;
    }
  }

  deleteItem(data) {
    const [parent, nodeToDelete] = BinarySearchTree.findParentAndNodeOf(
      this.root,
      data
    );

    // data not found: return
    if (!nodeToDelete) {
      return null;
    }

    let replacementNode = null;
    let freeChildren = null;

    // find children node that replace nodeToDelete
    if (nodeToDelete.left) {
      replacementNode = nodeToDelete.left;
      freeChildren = nodeToDelete.right;
    } else {
      replacementNode = nodeToDelete.right;
    }

    // replace nodeToDelete
    if (parent) {
      // find wich side is nodeToDelete to replace with selected children
      BinarySearchTree.replaceNode(parent, nodeToDelete, replacementNode);
    } else {
      // if no parent found, nodeToDelete is root
      this.root = replacementNode;
    }

    // insert remaining children of deleted node
    BinarySearchTree.insertNode(replacementNode, freeChildren);

    return nodeToDelete;
  }
}
