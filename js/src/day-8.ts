interface Node {
  meta: number[];
  children: Node[];
}

function parseLicense(license: number[]): Node {
  const [childrenQuantity, metaQuantity] = license.splice(0, 2);
  const node: Node = {meta: [], children: []}
  for(let i=0; i<childrenQuantity; i++) {
    node.children.push(parseLicense(license))
  }
  node.meta.push(...license.splice(0, metaQuantity))
  return node
}

const add = (a: number, b: number) => a + b;

function sumMeta(tree: Node): number {
  return tree.meta.reduce(add, 0) + tree.children.map(c => sumMeta(c)).reduce(add, 0);
}

export function checksumLicense(license: number[]) {
  return sumMeta(parseLicense(license))
}

function valueOfNode(node: Node): number {
  if(node.children.length < 1) {
    return node.meta.reduce(add, 0);
  } else {
    return node.meta.map(m => node.children[m-1]).filter(n => n !== undefined).map(n => valueOfNode(n)).reduce(add, 0)
  }
}

export function findRootValueOfLicense(license: number[]) {
  return valueOfNode(parseLicense(license));
}
