import './App.css';
import { useState } from 'react';

function App() {
    const { list, setList } = useState(['danish', 'dnas']);
    const { inputValue, setInpVal } = useState('');

    function addItem() {
        const copylist = [...list];
        copylist.push(inputValue);
        setList(copylist);
    }

    function form(e) {
        e.preventDefault();
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <form onSubmit={(e) => { form(e) }}>
                    <input placeholder='Enter Todo here' value={inputValue} />
                    <button onClick={addItem}>Add</button>
                </form>
                <ul>
                    {list.map((item) => {
                        return <li>{item}</li>
                    })}
                </ul>
            </header>
        </div>
    )
}
export default App;