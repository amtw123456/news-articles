
import NewsArticles from './newsArticles.jsx';
import { AppStateProvider } from './AppState';
import './App.css'

function App() {
  return (
    <AppStateProvider>
      <NewsArticles />
    </AppStateProvider>
  )
}

export default App
