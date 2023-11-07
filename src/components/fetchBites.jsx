import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { addDoc, doc, setDoc, collection, query } from 'firebase/firestore';
import { ref,  getDownloadURL, uploadBytes } from 'firebase/storage';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import  { useEffect } from 'react';
import { getDocs } from 'firebase/firestore';

function BitesList() {
  const [bites, setBites] = useState([]);
const currentUser = useContext(AuthContext);

  useEffect(() => {
    const fetchBites = async () => {
      const querySnapshot = await getDocs(collection(db, "bites"));
      setBites(querySnapshot.docs.map(doc => doc.data()));
    };

    fetchBites();
  }, []);

  return (
    <div>
        
          
      {bites.map((bite, index) => (
        <div key={index}>
          <h2>{bite.name}</h2>
          <p>{bite.description}</p>
        <button>Start Chat with {bite.user.email}</button>
        
        </div>
      ))}
    </div>
  );
}

export default BitesList;


