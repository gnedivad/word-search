var fs = require('fs');
var path = require('path');
var Trie = require('./trie.js');

var trie = new Trie();

var filename = path.join(__dirname, '../data/englishWords.txt')

fs.readFile(filename, 'utf8', function(error, words) {
  if (error) throw error;
  words.split('\n').forEach(function(word) {
    trie.add(word);
  });
});

exports.contains = function(string) {
  return trie.contains(string);
}

exports.containsPrefix = function(string) {
  return trie.containsPrefix(string);
}