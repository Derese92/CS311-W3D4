"use strict";
/* global describe */
/* global it */
/* global beforeEach */
/* global assert */
/* global BinarySearchTree */
// eslint-disable-next-line no-redeclare
/* global Node */
/* global RootNode */


describe("Binary Search Tree - Node", function () {
    let node = new Node();
    beforeEach(() => {
        node = new Node(5);
        node.add(3);
        node.add(7);
        node.add(1);
        node.add(4);
        node.add(6);
        node.add(8);
    });

    describe("max() method", function () {
        it("retrieves the largest element below this node", function () {
            assert.equal(node.max(), 8);
        });
    });
    describe("min() method", function () {
        it("retrieves the smallest element below this node", function () {
            assert.equal(node.min(), 1);
        });
    });

    describe("add(element) method", function () {
        it("adds an element into the tree below this branch", function () {
            node.add(0);
            node.add(2);
            node.add(9);
            assert.isTrue(node.contains(0));
            assert.isTrue(node.contains(2));
            assert.isTrue(node.contains(9));
        });
    });

    describe("contains(element) method", function () {
        it("Checks if this element is contained in this branch", function () {
            node.add(0);
            node.add(2);
            node.add(9);
            assert.isTrue(node.contains(0));
            assert.isTrue(node.contains(2));
            assert.isTrue(node.contains(9));
        });
    });

    describe("remove(parent, element) method", function () {
        it("removes no-child-nodes on the left", function () {
            assert.isTrue(node.remove(null, 1));
        });
        it("removes no-child-nodes on the right", function () {
            assert.isTrue(node.remove(null, 8));
        });
        it("removes one-child-nodes on the left", function () {
            assert.isTrue(node.remove(null, 1));
            assert.isTrue(node.remove(null, 3));
        });
        it("removes one-child-nodes on the right", function () {
            assert.isTrue(node.remove(null, 8));
            assert.isTrue(node.remove(null, 7));
        });
        it("removes two-child-nodes on the left", function () {
            assert.isTrue(node.remove(null, 3));
        });
        it("removes two-child-nodes on the right", function () {
            assert.isTrue(node.remove(null, 7));
        });
    });


});

describe("Binary Search Tree - RootNode", function () {
    let root = new RootNode();
    beforeEach(() => {
        root = new RootNode();
    });

    describe("add(element) method", function () {
        it("The first add() call sets the value on the root", function () {
            root.add("5");
            assert.equal(root.value, 5);
        });
        it("Works like a normal node for other additions", function () {
            root.add(5);
            root.add(3);
            root.add(7);
            root.add(1);
            root.add(4);
            root.add(6);
            root.add(8);
            assert.isTrue(root.contains(5));
            assert.isTrue(root.contains(3));
            assert.isTrue(root.contains(7));
            assert.isTrue(root.contains(1));
            assert.isTrue(root.contains(4));
            assert.isTrue(root.contains(6));
            assert.isTrue(root.contains(8));
        });
    });
    describe("remove(element) method", function () {
        it("sets the value of the root node to null (if it's the only value in the tree) ", () => {
            root.add(5);
            root.remove(5);
            assert.isNull(root.value);
        });
        it("works like a normal node for all other use cases", () => {
            root.add(5);
            root.add(3);
            root.add(7);
            root.add(1);
            root.add(4);
            root.add(6);
            root.add(8);
            assert.isTrue(root.remove(5));
            assert.isTrue(root.remove(3));
            assert.isTrue(root.remove(7));
            assert.isTrue(root.remove(1));
            assert.isTrue(root.remove(4));
            assert.isTrue(root.remove(6));
            assert.isTrue(root.remove(8));
        });
    });
    describe("min() method", function () {
        it("finds the min value when root is min", () => {
            root.add(5);
            let result = root.min();
            assert.equal(result, 5);
        });
        it("finds the min value when root's left is min", () => {
            root.add(5);
            root.add(4);
            let result = root.min();
            assert.equal(result, 4);
        });
        it("finds the min value when min is in left subtree", () => {
            root.add(5);
            root.add(3);
            root.add(4);
            root.add(2);
            let result = root.min();
            assert.equal(result, 2);
        });
    });
});

describe("BinarySearchTree", function () {
    let bst = new BinarySearchTree();
    beforeEach(() => {
        bst = new BinarySearchTree();
        bst.add(5);
        bst.add(3);
        bst.add(7);
        bst.add(1);
        bst.add(4);
        bst.add(6);
        bst.add(8);
    });

    describe("min() method", function () {
        it("returns the smallest element in the bst", function () {
            assert.equal(bst.min(), 1);
        });
    });
    describe("add(element) method", function () {
        it("adds elements to the bst (left if needed)", function () {
            bst.add(0);
            assert.equal(bst.root.left.left.left.value, 0);
        });
        it("adds element to the bst (right if needed)", () => {
            bst.add(9);
            assert.equal(bst.root.right.right.right.value, 9);
        });
    });
    describe("contains(element) method", function () {
        it("checks if a elment is in the bst", function () {
            assert.isTrue(bst.contains(3));
            assert.isFalse(bst.contains(10));
        });
    });
    describe("remove(element) method", function () {
        it("removes an elment from the bst", function () {
            assert.isFalse(bst.remove(10));
            assert.isTrue(bst.remove(5));
            assert.isTrue(bst.remove(3));
            assert.isTrue(bst.remove(7));
            assert.isTrue(bst.remove(1));
            assert.isTrue(bst.remove(4));
            assert.isTrue(bst.remove(6));
            assert.isTrue(bst.remove(8));
        });
    });
    describe("insertAll() method", function () {
        it("adds all elements from an array to the bst", function () {
            let bstArray = new BinarySearchTree();
            bstArray.insertAll([5, 3, 7, 1, 8]);
            assert.equal(bstArray.root.value, 5);
            assert.equal(bstArray.root.left.value, 3);
            assert.equal(bstArray.root.left.left.value, 1);         
            assert.equal(bstArray.root.right.value, 7);    
            assert.equal(bstArray.root.right.right.value, 8);
        });
    });
    describe("readIntoArray() method", function () {
        it("array containing all the values currently in the BST", function () {
            let bstArray = new BinarySearchTree();
            bstArray.insertAll([5, 3, 7, 1, 8]);
            let result = bstArray.readIntoArray();
            assert.deepEqual(result, [1, 3, 5, 7, 8]);
        });
    });
});