class Node {
	constructor(key, value = null, next = null) {
		this.key = key;
		this.value = value;
		this.next = next;
	}
}

export class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;

		this.length = null;
	}

	append(key, value) {
		let newNode = new Node(key, value);

		if (this.head === null) {
			this.head = newNode;
			this.length = 1;
		} else {
			let last = this.getTail();
			last.next = newNode;
			this.length++;
		}
	}

	prepend(data) {
		let newNode = new Node(data);

		if (this.head === null) {
			this.head = newNode;
			this.length = 1;
		} else {
			newNode.next = this.head;
			this.head = newNode;
			this.length++;
		}
	}

	getSize() {
		return this.length;
	}

	getHead() {
		return this.head;
	}

	getTail() {
		let current = this.head;
		while (current.next !== null) {
			current = current.next;
		}
		return current;
	}

	pop() {
		let current = this.head;
		while (current.next.next !== null) {
			current = current.next;
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

	insertAt(data, index) {
		if (index > this.length + 1 || index <= 0) {
			return 'Index not found';
		}

		if (index === this.length + 1) {
			this.append(data);
			return true;
		}
		if (index === 1) {
			this.prepend(data);
			return true;
		}

		let valBefore = this.at(index - 1);
		let valOf = this.at(index);

		let newNode = new Node(data);
		newNode.next = valOf;
		valBefore.next = newNode;
		this.length++;
	}

	removeAt(index) {
		if (index > this.length || index < 0) {
			return 'Index not found';
		}

		let valAfter = this.at(index + 1);
		if (index === 0) {
			this.head = valAfter;
			this.length--;
			return true;
		}

		let valBefore = this.at(index - 1);
		if (valBefore && valAfter) {
			valBefore.next = valAfter;
			this.length--;
			return true;
		}
		return false;
	}

	findPosition(data) {
		let current = this.head;
		let count = 0;
		while (current.next !== null) {
			if (current.key == data) {
				return count;
			}
			current = current.next;
			count++;
		}
		return null;
	}

	// printKeys(allKeys) {
	// 	let current = this.head;
	// 	while (current) {
	// 		allKeys.push(current.key);
	// 		current = current.next;
	// 	}
	// }
	// printValues(allValues) {
	// 	let current = this.head;
	// 	while (current) {
	// 		allValues.push(current.value);
	// 		current = current.next;
	// 	}
	// }

	printAll(all) {
		let current = this.head;
		while (current) {
			all.push([current.key, current.value]);
			current = current.next;
		}
	}
}
