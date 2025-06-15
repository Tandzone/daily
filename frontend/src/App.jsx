import { useState } from 'react'
import './App.css'
import JournalItem from './components/JournalItem'

function App() {

  return (
    <main className="max-w-xl mx-auto p-4 bg-green-200">
      <h1 className="text-3xl font-bold mb-6">Mon Journal</h1>

      <JournalItem
        title="Une première note"
        content="Ceci est le contenu de ma première note."
        date="15 juin 2025"
      />

      <JournalItem
        title="Une autre note"
        content="Ceci est une seconde note pour tester la réutilisabilité du composant."
        date="14 juin 2025"
      />
    </main>
  )
}

export default App
