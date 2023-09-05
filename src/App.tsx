import './App.css'
import {Header} from './components/header/Header.tsx';
import {Books} from './components/books/Books.tsx';

function App() {
    return (
        <div className='app'>
            <Header />
            <Books />
        </div>
    )
}

export default App
