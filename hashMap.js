import { LinkedList, Node } from './LinkedList.mjs';
import { cats } from './cats.mjs';

// class Node {
// 	constructor(key, value = null, next = null) {
// 		this.key = key;
// 		this.value = value;
// 		this.next = next;
// 	}
// }

class HashMap {
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

		return hashCode % this.buckets.length;
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

		this.validateIndex(index);

		if (!this.buckets[index]) {
			this.buckets[index] = new LinkedList();
			// only increase fill if adding to a new bucket
			this.filled++;
		}

		this.buckets[index].append(key, value);
	}

	get(key) {
		return null;
	}

	has(key) {}

	remove(key) {}

	length() {}

	clear() {}

	keys() {}

	values() {}

	entries() {}
}

const myHashMap = new HashMap();

/** Hash Function: */
// const hash_A = myHashMap.set('Seneca', 'Calico');
// const hash_B = myHashMap.set('Freya', 'Tabby');
// const hash_C = myHashMap.set('Okra', 'Tortie');
// const hash_D = myHashMap.set('Nico', 'Black');
// const hash_E = myHashMap.set('rOka', 'Mixed Up');
// const hash_F = myHashMap.set('Manon', 'Internet Cat');
// const hash_G = myHashMap.set('Samsek', 'Internet Cat');
// const hash_H = myHashMap.set('Lulu', 'Internet Cat');
// const hash_I = myHashMap.set('Chessica', 'Stray Cat');
// const hash_J = myHashMap.set('Voodoo', 'Stray Cat');
// const hash_K = myHashMap.set('Gilmak', 'Internet Cat');
// const hash_L = myHashMap.set('Chuchu', 'Internet Cat');
// const hash_M = myHashMap.set('Tuskie', 'Stray Cat');
// const hash_N = myHashMap.set('Mia', 'Stray Cat');
// const hash_O = myHashMap.set('Tilia', 'Stray Cat');
// const hash_P = myHashMap.set('TT', 'Internet Cat');
// const hash_Q = myHashMap.set('CoCo', 'Internet Cat');
// const hash_R = myHashMap.set('Mu', 'Stray Cat');

cats.forEach((cat) => {
	myHashMap.set(cat[0], cat[1]);
});

console.log(myHashMap.buckets);
console.log(myHashMap.filled);
console.log(myHashMap.capacity);
