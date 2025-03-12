export const questions = [
  // {
  //   id: 1,
  //   question: "What is the capital of France?",
  //   options: ["London", "Berlin", "Paris", "Madrid"],
  //   correct: 2,
  //   type: "mcq",
  //   explanation: "Paris is the capital and largest city of France."
  // },
  // {
  //   id: 2,
  //   question: "Which planet is known as the Red Planet?",
  //   options: ["Jupiter", "Mars", "Venus", "Saturn"],
  //   correct: 1,
  //   type: "mcq",
  //   explanation: "Mars appears red due to iron oxide (rust) on its surface."
  // },
  // {
  //   id: 1,
  //   question: "What is the worst-case time complexity of the QuickSort algorithm?",
  //   options: ["O(n)","O(nlogn)","O(n^2)","O(logn)"],
  //   correct: 2,
  //   type: "mcq",
  //   explanation: " QuickSort has a worst-case time complexity of O(n²) when the pivot selection is poor"
  // },
  {
    id: 2,
    question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correct: 1,
    type: "mcq",
    explanation: "Queue insert/delete element according to FIFO"
  },
  // {
  //   id: 5,
  //   question: "Which of these processes is not typically involved in refining petroleum?",
  //   options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
  //   correct: 1,
  //   type: "mcq",
  //   explanation: "Filtration is not the part of refining platform"
  // },
  {
    id: 3,
    question: "What is the space complexity of a recursive Fibonacci algorithm without memoization?",
    options: ["O(1)", "O(n)", "O(n^2)", "O(2^n)"],
    correct: 3,
    type: "mcq",
    explanation: "The recursive Fibonacci algorithm without memoization has an exponential space complexity due to the call stack."
  },
  // New Fill-in-the-blank (Integer) questions
  {
    id: 4,
    question: "What is the worst-case time complexity of bubble sort? Enter the answer as a number n where O(n^?) is the complexity.",
    type: "fill-integer",
    answer: 2,
    caseSensitive: false,
    explanation: "Bubble sort has a worst-case time complexity of O(n²), where n is the number of elements."
  },
  {
    id: 5,
    question: "The time complexity of inserting an element at the beginning of a singly linked list is ________.",
    type: "fill-string",
    answer: "O(1)",
    caseSensitive: false,
    explanation: "Inserting an element at the beginning of a singly linked list is a constant-time operation."
  },
  // New Fill-in-the-blank (String) questions
  {
    id: 6,
    question: "What sorting algorithm uses a divide-and-conquer strategy with O(n log n) average time complexity? (Enter the full algorithm name)",
    type: "fill-string",
    answer: "merge sort",
    caseSensitive: false,
    explanation: "Merge sort divides the input array into halves, sorts them separately, and then merges them."
  },
  {
    id: 7,
    question: "Which data structure would you use to implement a 'Undo' feature in a text editor? (Enter a singular term)",
    type: "fill-string",
    answer: "stack",
    caseSensitive: false,
    explanation: "A stack is ideal for undo operations because it follows Last-In-First-Out order."
  },
  {
    id: 8,
    question: "Complete this common algorithm paradigm: '_________ programming' is used when we break down a problem into overlapping subproblems.",
    type: "fill-string",
    answer: "dynamic",
    caseSensitive: false,
    explanation: "Dynamic programming is used when a problem can be broken down into overlapping subproblems that are solved only once and results cached."
  }
];