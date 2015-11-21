var Node = function(isWord, key, value) {
  if (isWord === undefined)  {
    this.isWord = false;
  } else {
    this.isWord = isWord;
  }

  this.children = {};
  if (key !== undefined && value !== undefined) {
    this.children[key] = value;
  }
}

Node.prototype.setIsWord = function(isWord) {
  this.isWord = isWord;
}

Node.prototype.setChild = function(key, value) {
  this.children[key] = value;
}

Node.prototype.getIsWord = function() {
  return this.isWord;
}

Node.prototype.getChild = function(key) {
  return this.children[key];
}

module.exports = Node;