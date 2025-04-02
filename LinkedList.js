import Node from "./Node.js";

export default class LinkedList {
  constructor() {
    this._head = new Node();
    this._tail = this._head;
    this._size = 0;
  }

  append(value) {
    const node = new Node(value);
    this._tail.next = node;
    this._tail = node;
    this._size++;
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this._head.next;
    this._head.next = node;
    this._size++;
  }

  size() {
    return this._size;
  }

  head() {
    return this._head.next;
  }

  tail() {
    return this._tail;
  }

  at(index) {
    let i = -1;
    let curr = this._head;
    while (i < index && curr) {
      curr = curr.next;
      i++;
    }

    return curr;
  }

  pop() {
    if (this._head === this._tail) {
      return;
    }

    let prev = this._head;
    let curr = prev.next;

    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }

    this._tail = prev;
    prev.next = null;
    this._size--;

    return curr;
  }

  contains(value) {
    let curr = this._head.next;

    while (curr) {
      if (curr.value === value) {
        return true;
      }
      curr = curr.next;
    }

    return false;
  }

  find(value) {
    let curr = this._head.next;
    let i = 0;

    while (curr) {
      if (curr.value === value) {
        return i;
      }

      curr = curr.next;
      i++;
    }

    return null;
  }

  toString() {
    let output = "";
    let curr = this._head.next;

    while (curr) {
      output += `${output !== "" ? " -> " : ""}( ${curr.value} )`;
      curr = curr.next;
    }

    output += `${output !== "" ? " -> " : ""}null`;

    return output;
  }

  insertAt(value, index) {
    const newNode = new Node(value);

    let prev = this._head;
    let curr = prev.next;
    let i = 0;

    while (i < index && curr) {
      prev = curr;
      curr = curr.next;
      i++;
    }

    prev.next = newNode;
    newNode.next = curr;
  }

  removeAt(index) {
    let prev = this._head;
    let curr = prev.next;
    let i = 0;

    while (i < index && curr) {
      prev = curr;
      curr = curr.next;
      i++;
    }

    if (curr) {
      prev.next = curr.next;
      this._size--;
    } else {
      prev.next = curr;
    }

    if (this._tail === curr) {
      this._tail = prev;
    }

    return curr;
  }
}
