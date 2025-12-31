import React, { useState,useCallback } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
    

  //Get all notes 
    const getNotes = useCallback(async () => {
  const URL = `${host}/api/notes/fetchallnotes`;
  const response = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  });

  const json = await response.json();
  setNotes(json);
}, []);

  
  //add note function 
    const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token':localStorage.getItem('token')
        
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    setNotes(notes.concat(json)); // ✅ backend response
  };


  //delete note
  const deleteNote = async (id) => {
    //api call
    const URL = `${host}/api/notes/deletenote/${id}`;
    const response=await fetch(URL,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    });
    const json=response.json();
    console.log(json)
   

    // console.log("deleting note with id" + id);
    const newNotes=notes.filter((note)=>{ return note._id!==id});
    setNotes(newNotes);
  };

  //edit note
  const editNote = async (id, title, description, tag) => {
    //api call  
    const URL = `${host}/api/notes/updatenote/${id }`;
    const response=await fetch(URL,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    });
    const json=response.json();
    console.log(json)
    let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit in backend
    // console.log("editing the note with id" + id);
    for(let i=0;i<newNotes.length;i++){
      const element=newNotes[i];
      if(element._id===id){
        newNotes[i].title=title;
        newNotes[i].description=description;
        newNotes[i].tag=tag;
      }
      break;
    }
    // console.log(newNotes);
     setNotes(newNotes); 

  }

    return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
  };

  


export default NoteState;
