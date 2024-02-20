import { LinkedList } from './LinkedList.mjs';
import { cats } from './cats.mjs';

class HashMap {
	constructor() {
		this.filled = 0;
		this.buckets = new Array(16);
		this.capacity = this.buckets.length;
		this.loadFactor = 0.75;
	}

	length() {
		return this.filled;
	}

	grow() {
		this.capacity = this.buckets.length * 2;
	}

	clear() {
		this.filled = 0;
		this.buckets = new Array(16);
		this.capacity = this.buckets.length;
	}

	hash(key) {
		let hashCode = 0;

		const primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
		}

		let index = hashCode % this.buckets.length;

		// check if index is within bounds:
		if (index < 0 || index >= this.buckets.length) {
			throw new Error('Trying to access index out of bound');
		}

		return index;
	}

	set(key, value) {
		// check if load factor is reached:
		if (this.filled / this.buckets.length >= this.loadFactor) {
			this.grow();
		}

		let index = this.hash(key);

		if (!this.buckets[index]) {
			this.buckets[index] = new LinkedList();
		}
		this.filled++;

		this.buckets[index].append(key, value);
	}

	getValue(key) {
		let index = this.hash(key);

		return this.buckets[index].find(key);
	}

	has(key) {
		let index = this.hash(key);

		return this.buckets[index].contains(key);
	}

	remove(key) {
		let index = this.hash(key);
		if (this.buckets[index].removeKey(key)) {
			this.filled--;
			return true;
		}
		return false;
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

const myHashMap = new HashMap();

// /** Hash Function: */

cats.forEach((cat) => {
	myHashMap.set(cat[0], cat[1]);
});

console.log(myHashMap.entries());
