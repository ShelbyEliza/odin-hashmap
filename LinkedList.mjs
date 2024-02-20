class Node {
	constructor(key) {
		this.key = key;
		this.next = null;
	}
}

class NodeWithValue extends Node {
	constructor(key, value = null) {
		super(key);
		this.value = value;
	}
}

export class LinkedList {
	constructor() {
		this.head = null;
		this.tail = this.getTail();
		this.length = null;
	}

	append(key, value) {
		let newNode;
		value
			? (newNode = new NodeWithValue(key, value))
			: (newNode = new Node(key, value));

		if (this.head === null) {
			this.head = newNode;

			this.length = 1;
		} else {
			this.getTail();
			let last = this.getTail();
			last.next = newNode;

			this.length++;
		}
	}

	getTail() {
		let current = this.head;
		if (this.head === null) {
			return null;
		}
		while (current.next !== null) {
			current = current.next;
		}

		return current;
	}

	getSize() {
		return this.length;
	}

	getHead() {
		return this.head;
	}

	pop() {
		let current = this.head;
		while (current.next.next !== null) {
			current = current.next;
			this.tail = current;
		}
		current.next = null;
		this.length--;
	}

	lookUp(data) {
		let current = this.head;
		while (current.next !== null) {
			if (current.key === data) {
				return current;
			}
			current = current.next;
		}
		return null;
	}

	contains(data) {
		let current = this.head;

		if (current.key === data || this.getTail().key === data) {
			return true;
		}
		while (current.next !== null) {
			if (current.key === data) {
				return true;
			}
			current = current.next;
		}
		return false;
	}

	find(data) {
		let current = this.head;

		while (current.next !== null) {
			if (current.key === data) {
				return current.value;
			}
			current = current.next;
		}
		return null;
	}

	at(index) {
		if (index > this.length || index < 0) {
			return null;
		}
		let current = this.head;
		let count = 0;
		while (count < index) {
			current = current.next;
			count++;
		}
		return current;
	}

	removeKey(key) {
		// key to remove is the head:
		if (this.head.key === key) {
			// the list is only 1 long:
			if (this.length === 1) {
				this.head = null;
				this.length = 0;
			} else {
				this.head = this.head.next;
				this.length--;
			}
			return true;
		} else {
			let current = this.head;
			if (current.next) {
				while (current !== null) {
					// if current is the value before:
					if (current.next.key === key) {
						// if there is a value after:
						if (current.next.next) {
							current.next = current.next.next;
							// if value to delete is the tail:
						} else {
							current.next = null;
						}
						this.length--;
						return true;
					}
					current = current.next;
				}
			}
			return false;
		}
	}

	printAll(all) {
		let current = this.head;
		while (current) {
			if (current.value) {
				all.push([current.key, current.value]);
			} else {
				all.push(current.key);
			}
			current = current.next;
		}
	}
}
