/* eslint-disable require-jsdoc */
"use strict";

// eslint-disable-next-line no-redeclare
class Node {
    constructor(value, comparator = (a, b) => a - b) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.comparator = comparator;
    }
    min() {
        if (this.left !== null) {
            return this.left.min();
        }
        else {
            return this.value;
        }
    }

    max() {
        if (this.right !== null) {
            return this.right.max();
        }
        else {
            return this.value;
        }
    }
    add(element) {
        //if (element > this.value) {
            if (this.comparator(element, this.value)>0) {
            if (this.right === null) {
                this.right = new Node(element, this.comparator);
            }
            else {
                this.right.add(element);
            }
        }
        else {
            if (this.left === null) {
                this.left = new Node(element, this.comparator);
            }
            else {
                this.left.add(element);
            }
        }
    }
    contains(element) {
        //if (element === this.value) {
            if (this.comparator(element, this.value)===0) {
            return true;
        }
        // if (element > this.value) {
            if (this.comparator(element, this.value)>0) {
            if (this.right === null) {
                return false;
            }
            else {
                return this.right.contains(element);
            }
        }
        else {
            if (this.left === null) {
                return false;
            }
            else {
                return this.left.contains(element);
            }
        }
    }
    remove(parent, element) {
        // if (element < this.value) {
            if (this.comparator(element, this.value)<0) {
            if (this.left === null) {
                return false;
            }
            else {
                return this.left.remove(this, element);
            }
        }
        // else if (element > this.value) {
            if(this.comparator(element, this.value)>0){
            if (this.right === null) {
                return false;
            }
            else {
                return this.right.remove(this, element);
            }
        }
        else { //if (element === this.value) {
            // simply remove this node if it doesn't have children 
            if (this.left === null && this.right === null) {
                if (parent.left === this) {
                    parent.left = null;
                }
                else if (parent.right === this) {
                    parent.right = null;
                }
            }
            // if there is one child, put it in our place
            else if (this.left !== null && this.right === null) {
                this.value = this.left.value;
                this.right = this.left.right;
                this.left = this.left.left;
                return true;
            } else if (this.right !== null && this.left === null) {
                this.value = this.right.value;
                this.left = this.right.left;
                this.right = this.right.right;
                return true;
            } else if (this.left !== null && this.right !== null) {
                // if there are two children copy the largest of the small and prune that
                let largest = this.left.max();
                this.value = largest;
                this.left.remove(this, largest);
            }
            return true;
        } // end of "if this is the value to remove"
    } // end of remove method
    inOrderTraverse() {
        let result = [];
        let left = [];
        let right = [];
        if (this.left) {
            left = this.left.inOrderTraverse();
        }
        if (this.right) {
            right = this.right.inOrderTraverse();
        }
        result = [...left, this.value, ...right];
        return result;
    } 
} // end of Node class

class RootNode extends Node {
    constructor() {
        super(null);
    }
    add(element) {
        if (this.value === null) {
            this.value = element;
            return;
        }
        return super.add(element);
    }
    remove(element) {
        if (this.value === element && this.left === null && this.right === null) {
            this.value = null;
            return true;
        }
        else {
            return super.remove(this, element);
        }
    }
}

// eslint-disable-next-line no-unused-vars
class BinarySearchTree {
    constructor() {
        this.root = new RootNode();
    }
    add(element) {
        this.root.add(element);
    }
    contains(element) {
        return this.root.contains(element);
    }
    remove(element) {
        return this.root.remove(element);
    }
    min() {
        return this.root.min();
    }
    /**
         * takes an array of values and inserts all of them into the BST
         * 
         * @param {Array} array
         */

    insertAll(array) {
        for (let value of array) {
            this.add(value);
        }
    }
    /**
     * returns an array containing all the values currently in the BST
     * @returns {Array} array containing all the values currently in the BST
     */
    readIntoArray() {
        return this.root.inOrderTraverse();
    }
}





