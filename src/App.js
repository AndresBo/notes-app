import Note from "./components/Note"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import axios from "axios"

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // useEffect fetched data from bd at first render:
  useEffect(() => {
    console.log('hi from useEffect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fullfilled')
        setNotes(response.data)
      })
  },[])
  //console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: nanoid()
    }
    axios 
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
    )
}

export default App
