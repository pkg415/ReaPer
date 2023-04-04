import { getFiberNodeTagName } from './helperFns';
// define structure of tree

/* eslint-disable */
class TreeNode {
  constructor (data){
    this.data = data;
    this.children = [];
    this.parent = null;
    this.componentName = '';
  }

  addChild(newNode) {
    if (newNode) {
      newNode.parent = this;
      this.children.push(newNode);
    }
  }

  setComponentName(name) {
    this.componentName = name;
  }
}

class Tree {
  constructor(rootFiberNode) {
    this.root = null;
    this.buildTree(rootFiberNode);
  }

  buildTree(rootFiberNode) {
    function traverse(fiberNode, parentTreeNode) {
      const {
        sibling,
        stateNode,
        child,
        // with memoizedState we can grab the root type and construct an Abstract Syntax Tree from the hooks structure using Acorn in order to extract the hook getters and match them with their corresponding setters in an object
        memoizedState,
        memoizedProps,
        elementType,
        tag,
        actualDuration,
        actualStartTime,
        selfBaseDuration,
        treeBaseDuration,
        dependencies,
        _debugHookTypes,
      } = fiberNode;
  
      console.log('Tree traverse(), elementType=', elementType, ', \n', 
      'name=', elementType ? elementType.name : 'nameless', ', \n', 
      'tag=', getFiberNodeTagName(tag), ', \n', 
      'actualDuration=', actualDuration, ', \n', 
      'actualStartTime=', actualStartTime, ', \n', 
      'selfBaseDuration=', selfBaseDuration, ', \n', 
      'treeBaseDuration=', treeBaseDuration, ', \n', 
      'dependencies=', dependencies, ', \n', 
      '_debugHookTypes=', _debugHookTypes, ', \n',
      'sibling=', sibling, ', \n',
      'stateNode=', stateNode, ', \n',
      'child=', child, ', \n',
      'memoizedState=', memoizedState, ', \n',
      'memoizedProps=', memoizedProps
      );

      // Create a TreeNode using the FiberNode
      const newNode = new TreeNode(fiberNode.data);

      // If parentTreeNode is null, set the root of the tree
      if (!parentTreeNode) {
        // Root node will always have the hardcoded component name 'root'
        newNode.setComponentName('root');
        this.root = newNode;
      } else {
        // Add the new TreeNode to the parent's children array
        parentTreeNode.addChild(newNode);
      }

      // If fiberNode has a child, traverse down the tree
      if (fiberNode.child) {
        traverse(fiberNode.child, newNode);
      }

      // If fiberNode has a sibling, traverse to the sibling
      if (fiberNode.sibling) {
        traverse(fiberNode.sibling, parentTreeNode);
      }
    }

    traverse.call(this, rootFiberNode, null);
  }
}



// Function to create a tree
const createTree = (fiberObj) => {
  const tree = new Tree(fiberObj);
  console.log('CreateTree: fiberObj=', fiberObj);
  console.log('CreateTree: tree=', tree);
  return tree;
};

export default createTree;

// Hard-coded tests
// const childNode13 = {
//   data: { name: 'Box 9' },
//   child: null,
//   sibling: null,
//   id: 13
// };

// const childNode12 = {
//   data: { name: 'Box 8' },
//   child: null,
//   sibling: childNode13,
//   id: 12
// };

// const childNode11= {
//   data: { name: 'Box 7' },
//   child: null,
//   sibling: childNode12,
//   id: 11
// };

// const childNode10 = {
//   data: { name: 'Box 6' },
//   child: null,
//   sibling: null,
//   id: 10
// };

// const childNode9 = {
//   data: { name: 'Box 5' },
//   child: null,
//   sibling: childNode10,
//   id: 9
// };

// const childNode8 = {
//   data: { name: 'Box 4' },
//   child: null,
//   sibling: childNode9,
//   id: 8
// };

// const childNode7 = {
//   data: { name: 'Box 3' },
//   child: null,
//   sibling: null,
//   id: 7
// };

// const childNode6 = {
//   data: { name: 'Box 2' },
//   child: null,
//   sibling: childNode7,
//   id: 6
// };

// const childNode5 = {
//   data: { name: 'Box 1' },
//   child: null,
//   sibling: childNode6,
//   id: 5
// };

// const childNode4 = {
//   data: { name: 'Row 3' },
//   child: null,
//   sibling: null,
//   id: 4
// };

// const childNode3 = {
//   data: { name: 'Row 2' },
//   child: null,
//   sibling: childNode4,
//   id: 3
// };

// const childNode2 = {
//   data: { name: 'Row 1' },
//   child: childNode5,
//   sibling: childNode3,
//   id: 2
// };

// const childNode1 = {
//   data: { name: 'Board' },
//   child: childNode2,
//   sibling: null,
//   id: 1
// };

// const fiberRoot = {
//   data: { name: 'App' },
//   child: childNode1,
//   sibling: null,
//   id: 0
// };

// console.log(createTree(fiberRoot));
