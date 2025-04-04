import BinarySearchTreeNode from "./BinarySearchTreeNode.js";
import LinkedList from "./LinkedList.js";

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

  findParentAndNodeOf(data) {
    let parent = null;
    let curr = this.root;

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

  insert(data) {
    const [parent, node] = this.findParentAndNodeOf(data);
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

  static findSuccessor(root) {
    let curr = root.right;
    while (curr !== null && curr.left !== null) {
      curr = curr.left;
    }
    return curr;
  }

  deleteItem(data, root = this.root) {
    if (root === null) {
      return root;
    }

    if (data < root.data) {
      root.left = this.deleteItem(data, root.left);
    } else if (root.data < data) {
      root.right = this.deleteItem(data, root.right);
    } else {
      if (root.left === null) {
        return root.right;
      }

      if (root.right === null) {
        return root.left;
      }

      const succ = BinarySearchTree.findSuccessor(root);
      root.data = succ.data;
      root.right = this.deleteItem(succ.data, root.right);
    }

    return root;
  }

  find(data) {
    const [parent, node] = this.findParentAndNodeOf(data);

    return node;
  }

  static validateCallback(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function must be provided");
    }
  }

  levelOrderIter(callback) {
    BinarySearchTree.validateCallback(callback);

    const queue = new LinkedList();
    queue.append(this.root);

    while (queue.size() > 0) {
      const node = queue.removeAt(0).value;
      callback(node);

      if (node.left !== null) {
        queue.append(node.left);
      }
      if (node.right !== null) {
        queue.append(node.right);
      }
    }
  }

  levelOrderRecur(callback) {
    BinarySearchTree.validateCallback(callback);

    function helper(node, level) {
      if (node === null) {
        return;
      }

      if (res.length < level) {
        res.push([]);
      }

      res[level - 1].push(node);

      helper(node.left, level + 1);
      helper(node.right, level + 1);
    }

    const res = [];
    helper(this.root, 1);

    for (const level of res) {
      for (const node of level) {
        callback(node);
      }
    }
  }

  inOrderIter(callback) {
    BinarySearchTree.validateCallback(callback);

    const stack = [];
    let curr = this.root;
    while (curr !== null || stack.length > 0) {
      while (curr !== null) {
        stack.push(curr);
        curr = curr.left;
      }

      curr = stack.pop();
      callback(curr);

      curr = curr.right;
    }
  }

  inOrderRecur(callback, node = this.root) {
    BinarySearchTree.validateCallback(callback);

    if (node === null) {
      return;
    }

    this.inOrderRecur(callback, node.left);
    callback(node);
    this.inOrderRecur(callback, node.right);
  }

  preOrderIter(callback) {
    BinarySearchTree.validateCallback(callback);

    const stack = [];
    stack.push(this.root);

    while (stack.length > 0) {
      let curr = stack.pop();
      while (curr) {
        if (curr.right) {
          stack.push(curr.right);
        }
        callback(curr);
        curr = curr.left;
      }
    }
  }

  preOrderRecur(callback, node = this.root) {
    BinarySearchTree.validateCallback(callback);

    if (node === null) {
      return;
    }

    callback(node);
    this.preOrderRecur(callback, node.left);
    this.preOrderRecur(callback, node.right);
  }

  postOrderRecur(callback, node = this.root) {
    BinarySearchTree.validateCallback(callback);

    if (node === null) {
      return;
    }
    this.postOrderRecur(callback, node.left);
    this.postOrderRecur(callback, node.right);
    callback(node);
  }

  height(node = this.root) {
    if (node === null) {
      return 0;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return (
      Math.max(leftHeight, rightHeight) + 1 + (node === this.root ? -1 : 0)
    );
  }

  depth(node) {
    let currentDepth = 0;
    const queue = new LinkedList();
    queue.append(this.root);

    while (queue.size() > 0) {
      const size = queue.size();
      for (let i = 0; i < size; i++) {
        const temp = queue.removeAt(0).value;

        if (temp.data == node) {
          return currentDepth;
        }

        if (temp.left !== null) {
          queue.append(temp.left);
        }
        if (temp.right !== null) {
          queue.append(temp.right);
        }
      }
      currentDepth++;
    }
  }

  isBalanced() {
    function helper(node) {
      if (node === null) {
        return 0;
      }

      const leftHeight = helper(node.left);
      const rightHeight = helper(node.right);

      if (
        leftHeight === -1 ||
        rightHeight === -1 ||
        Math.abs(leftHeight - rightHeight) > 1
      ) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return helper(this.root) !== -1;
  }

  rebalance() {
    const elements = [];
    this.inOrderIter((node) => elements.push(node.data));
    this.root = null;
    this.root = BinarySearchTree.buildTree(elements);
  }
}
