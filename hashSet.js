import { LinkedList } from './LinkedList.mjs';
import { cats } from './cats.mjs';

class HashSet {
	constructor() {
		this.filled = 0;
		this.buckets = new Array(16);
		this.capacity = this.buckets.length;
		this.loadFactor = 0.75;
	}

	validateIndex(index) {
		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to access index out of bound');
		}
		return index;
	}

	grow() {
		this.capacity = this.buckets.length * 2;
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}

		let index = hashCode % this.buckets.length;
		this.validateIndex(index);
		return index;
	}

	checkFillLevel() {
		if (this.filled / this.buckets.length >= this.loadFactor) {
			return true;
		}
		return false;
	}

	set(key, value) {
		if (this.checkFillLevel()) {
			this.grow();
		}

		let index = this.hash(key);

		if (!this.buckets[index]) {
			this.buckets[index] = new LinkedList();
		}
		this.filled++;

		this.buckets[index].append(key, value);
	}

	get(key) {
		let index = this.hash(key);

		return this.buckets[index].find(key);
	}

	has(key) {
		let index = this.hash(key);

		return this.buckets[index].contains(key);
	}

	remove(key) {
		let index = this.hash(key);
		// console.log(index);
		let position = this.buckets[index].findPosition(key);
		// console.log(position);
		if (this.buckets[index].removeAt(position)) {
			this.filled--;
			return true;
		}
		return false;
	}

	length() {
		return this.filled;
	}

	clear() {
		this.filled = 0;
		this.buckets = new Array(16);
		this.capacity = this.buckets.length;
	}

	keys() {
		let allKeys = [];
		let allEntries = this.entries();
		allEntries.forEach((entry) => {
			allKeys.push(entry[0]);
		});
		return allKeys;
	}

	values() {
		let allValues = [];
		let allEntries = this.entries();
		allEntries.forEach((entry) => {
			allValues.push(entry[1]);
		});
		return allValues;
	}

	entries() {
		let allEntries = [];
		for (let i = 0; i <= this.buckets.length; i++) {
			if (this.buckets[i]) {
				this.buckets[i].printAll(allEntries);
			}
		}
		return allEntries;
	}
}

const myHashSet = new HashSet();

/** Hash Function: */

cats.forEach((cat) => {
	myHashSet.set(cat[0], cat[1]);
});

// console.log(myHashSet.buckets);
// console.log(myHashSet.length());

// console.log(myHashSet.entries());
// console.log(myHashSet.values());
// console.log(myHashSet.keys());
