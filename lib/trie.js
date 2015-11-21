var Node = require('./node.js');

var Trie = function() {
  this.root = new Node();
  this.size = 0;
}

Trie.prototype.add = function(word) {
  this._addHelper(this.root, word);
}

Trie.prototype._addHelper = function(node, subWord) {
  if (subWord == '') {
    node.setIsWord(true);
    this.size += 1;
  } else {
    var firstLetter = subWord[0];
    var child = node.getChild(firstLetter);
    if (!child) {
      child = new Node();
      node.setChild(firstLetter, child);
    }
    this._addHelper(child, subWord.substring(1))
  }
}

Trie.prototype.contains = function(string) {
  return this._containsHelper(this.root, string);
}

Trie.prototype._containsHelper = function(node, subString) {
  if (node === undefined) {
    return false;
  }
  if (subString === '') {
    return node.getIsWord();
  }
  var firstLetter = subString[0];
  var child = node.getChild(firstLetter);
  return this._containsHelper(child, subString.substring(1));
}

Trie.prototype.containsPrefix = function(string) {
  return this._containsPrefixHelper(this.root, string);
}

Trie.prototype._containsPrefixHelper = function(node, subString) {
  if (node === undefined) {
    return false;
  }
  if (subString === '') {
    return true;
  }
  var firstLetter = subString[0];
  var child = node.getChild(firstLetter);
  return this._containsPrefixHelper(child, subString.substring(1));
}

Trie.prototype.getSize = function() {
  return this.size;
}

Trie.prototype.toString = function() {
  return JSON.stringify(this.root, null, 2);
}

module.exports = Trie;