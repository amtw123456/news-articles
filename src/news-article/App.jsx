
import NewsArticles from './newsArticles.jsx';
import { AppStateProvider } from './AppState';

function App() {
  return (
    <AppStateProvider>
      <NewsArticles />
    </AppStateProvider>
  )
}

export default App
