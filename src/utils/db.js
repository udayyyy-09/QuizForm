//creating DB
import { formatDate } from './helpers';
export const initDB = () => {
    return new Promise((resolve, reject) => {
      //1st step: opening database
      const request = indexedDB.open("QuizDB", 1);
      //2nd step: handle erros
      request.onerror = () => {
        reject("Error opening database");
      };
  
      request.onsuccess = (event) => {
        resolve(event.target.result);
      };
      //3rd step: create a objects in database
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        if (!db.objectStoreNames.contains("quizResults")) {
          const store = db.createObjectStore("quizResults", { 
            keyPath: "id", 
            autoIncrement: true 
          });
          //it will create columns with uniqness false in object table
          store.createIndex("Date", "Date", { unique: false });
          store.createIndex("Score","Score",{unique:false});
        }
      };
    });
  };
  
  // Save Quiz Result
  export const addQuizResult = async (result) => {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["quizResults"], "readwrite");   //two paramter and transaction is used to store the data in objectStore
      const store = transaction.objectStore("quizResults");  //accessing object store
      // const date = new Date();
      // const formatDate = date.toLocaleString();
      const request = store.add({   //to add new record to Object Store
        date: formatDate,
        score: result.score,
        totalQuestions: result.totalQuestions,
        timeTaken: result.timeTaken,
        answers: result.answers
      });
  
      // after added record checking for error
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Error adding result");
    });
  };
  
  // Get All Quiz Results
  export const getQuizResults = async () => {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["quizResults"], "readonly");   //for only read the data
      const store = transaction.objectStore("quizResults");
      const request = store.getAll(); //get all record
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject("Error getting results");
    });
  };
  
  // Function to Get Last N Quiz Results
  export const getLastResults = async (n) => {
    const db = await initDB();
    
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(["quizResults"], "readonly");
      const store = transaction.objectStore("quizResults");
      const request = store.getAll();
  
      request.onsuccess = () => {
        const allResults = request.result;
        resolve(allResults.slice(-n));
      };
      request.onerror = () => reject("Error getting results");
    });
  };
  