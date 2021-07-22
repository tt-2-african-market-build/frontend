//this removes all duplicates from an array of integers
function unique(array) {
  return array.filter(function (item, pos, arr) {
    return arr.indexOf(item) == pos;
  });
}

//this inverts a data table
function invert(data) {
  var inverted = {};
  for (var i = 0; i < data.length; i++) {
    inverted[data[i]] = i;
  }
  return inverted;
}

//Given a string s, find the length of the longest substring without repeating characters.

// Example 1:

// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.
// Example 2:

// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:

// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
// Example 4:

// Input: s = ""
// Output: 0

function lengthOfLongestSubstring(s) {
  var max = 0;
  var current = [];
  for (var i = 0; i < s.length; i++) {
    if (current.indexOf(s[i]) == -1) {
      current.push(s[i]);
    } else {
      current = current.slice(current.indexOf(s[i]) + 1);
      current.push(s[i]);
    }
    if (current.length > max) {
      max = current.length;
    }
  }
  return max;
}

// Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

// The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

// You must write an algorithm that runs in O(n) time and without using the division operation.

//my solution
function productExceptSelf(nums) {
  var result = [];
  var product = 1;
  for (var i = 0; i < nums.length; i++) {
    result[i] = product;
    product *= nums[i];
  }
  product = 1;
  for (var i = nums.length - 1; i >= 0; i--) {
    result[i] *= product;
    product *= nums[i];
  }
  return result;
}

//Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

//Example 1:

//Input: "babad"
//Output: "bab"
//Note: "aba" is also a valid answer.
//Example 2:

//Input: "cbbd"
//Output: "bb"

function longestPalindrome(s) {
  var max = 0;
  var start = 0;
  var end = 0;
  for (var i = 0; i < s.length; i++) {
    var left = i - 1;
    var right = i + 1;
    while (left >= 0 && right < s.length && s[left] == s[right]) {
      left--;
      right++;
    }
    if (right - left - 1 > max) {
      max = right - left - 1;
      start = left + 1;
      end = right - 1;
    }
    var left = i;
    var right = i + 1;
    while (left >= 0 && right < s.length && s[left] == s[right]) {
      left--;
      right++;
    }
    if (right - left - 1 > max) {
      max = right - left - 1;
      start = left + 1;
      end = right - 1;
    }
  }
  return s.substring(start, end + 1);
}

//guven two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

//Example 1:

//nums1 = [1, 3]
//nums2 = [2]
//Output: 2.0

//Example 2:

//nums1 = [1, 2]
//nums2 = [3, 4]
//Output: (2 + 3)/2 = 2.5

function findMedianSortedArrays(nums1, nums2) {}

//merge two sorted lists and return it as a sorted list. the list should be splicing together the nodes of the two lists.

//Example 1:

//Input: 1->2->4, 1->3->4
//Output: 1->1->2->3->4->4

//Example 2:

//Input: 1->3->5, 2->4->6
//Output: 1->2->3->4->5->6

// function mergeTwoLists(l1, l2) {
//     var head = new ListNode(0);
//     var current = head;
//     while (l1 && l2) {
//         if (l1.val < l2.val) {
//             current.next = l1;
//             l1 = l1.next;
//         } else {
//             current.next = l2;
//             l2 = l2.next;
//         }
//         current = current.next;
//     }
//     if (l1) {
//         current.next = l1;
//     } else {
//         current.next = l2;
//     }
//     return head.next;
// }

// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

// You must write an algorithm with O(log n) runtime complexity.

//Example 1:

//Input: [1,3,5,6], 5
//Output: 2

function searchInsert(nums, target) {
  var low = 0;
  var high = nums.length - 1;
  while (low <= high) {
    var mid = (low + high) >> 1;
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}

//You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

//my solution

function rotate(matrix) {
  var n = matrix.length;
  for (var i = 0; i < n; i++) {
    for (var j = i; j < n; j++) {
      var temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n / 2; j++) {
      var temp = matrix[i][j];
      matrix[i][j] = matrix[i][n - 1 - j];
      matrix[i][n - 1 - j] = temp;
    }
  }
}
// Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

// The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

// It is guaranteed that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

// Example 1:

// Input: candidates = [2,3,6,7], target = 7,
// A solution set is:
// [
//   [2,2,3],
//   [7]
//  ]

// Example 2:

// Input: candidates = [2,3,5], target = 8,
// A solution set is:
// [
//   [2,2,2,2],
//   [2,3,3],
//   [3,5]
// ]

//my solution
var combinationSum = function(candidates, target) {
  var result = [];
  var combination = [];
  var helper = function(candidates, target, start) {
    if (target === 0) {
      result.push(combination.slice());
      return;
    }
    for (var i = start; i < candidates.length; i++) {
      if (candidates[i] > target) {
        return;
      }
      combination.push(candidates[i]);
      helper(candidates, target - candidates[i], i);
      combination.pop();
    }
  };
  helper(candidates, target, 0);
  return result;
}
