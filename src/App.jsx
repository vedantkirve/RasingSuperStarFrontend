import BookingPage from './pages/BookingPage'
import { Toaster } from 'sonner'
import './App.css'

function App() {
  return (
    <>
      <Toaster position="top-center" richColors theme="dark" />
      <BookingPage />
    </>
  )
}

export default App
