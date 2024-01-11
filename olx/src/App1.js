import logo from './logo.svg';
import { useState } from 'react'
import './App.css';
import userEvent from '@testing-library/user-event';

//State:
//1. Jab bhi update ho to, react ko bhi update karte hai.
//Variable esa nai karta.

//2. State are directly immutable. Matlab states ko directly change nai karenge. balkay un ke methods ke zarye karenge.

// Falsy Values:
// 1. false
// 2. undefined
// 3. NaN
// 4. null
// 5. '' kali string false ho jayega agar ' ' space howa to true ho jayega. 
// 6. 0

// "!!" behind to check the value is true or false (e.g !![], !!{}, !!10, !!'')

function App() {
  const [newText, setNewText] = useState('Moye Moye');
  const [newList, setNewList] = useState([]);
  const [text2, setText2] = useState('Hello World');

  function reverseText() {
    setNewText(newText.split('').reverse().join(''));
  }
  const text = 'Welcome to my store.'
  const num = 53
  const car = {
    name: "civic",
    model: 1986,
    color: 'Gray'
  }
  const memes = [
    'moye moye', 'elvish bhai', 'kesa diya'
  ]


  let carsArr = [
    {
      name: 'Mercedes',
      model: 1980,
      color: 'white',
      features: [
        'Power Window', 'Power Steering'
      ]
    },
    {
      name: 'Bently',
      model: 1993,
      color: 'Black',
      features: [
        'Speed Exaust', 'National Gari'
      ]
    },
    {
      name: 'Corolla',
      model: 2002,
      color: 'Grey',
      features: [
        'Gears Wheels', 'Rims Bumper'
      ]
    },
  ]

  const name = "Hello World";
  const obj = { name: "Hello World Object" };
  const data = ['We', 'are', 'United']; //Show these in seperate tags
  const list = [{ name: "Hello World 1" }, { name: "Hello World 2" }, { name: "Hello World 3" }]; //Show these in seperate tags
  const complex = [{ company: 'XYZ', jobs: ['Javascript', 'React'] }, { company: 'ABC', jobs: ['AngularJs', 'Ionic'] }];

  const [OnOff, toggleOnOff] = useState(true);
  const src = OnOff ? 'https://cdn1.vectorstock.com/i/1000x1000/05/10/3d-realistic-turning-on-light-bulb-icon-vector-28050510.jpg' : 'https://w7.pngwing.com/pngs/859/425/png-transparent-light-bulb-illustration-incandescent-light-bulb-lamp-bulb-candle-product-light-thumbnail.png';

  const [List, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editUpdate, setEUValue] = useState(true);
  const [index1, setIndex1] = useState(null);

  function addItem() {
    if (inputValue == '') {
      alert('Input value is empty!')
    } else {
      const copylist = [...List];
      copylist.push(inputValue);
      setList(copylist);
      setInputValue('');
    }
  }

  function updInpVal(e) {
    const value = e.target.value;
    setInputValue(value);
  }

  function deleteItem(index) {
    const copylist = [...List];
    copylist.splice(index, 1);
    setList(copylist);
  }
  function editItem(index) {
    setIndex1(index);
    const value2 = List[index];
    setInputValue(value2);
    setEUValue(false);
  }

  function updateItem() { 
    const copyList = [...List];
    copyList[index1] = inputValue;
    setList(copyList);
    setEUValue(true);
    setInputValue('');
  }

  function form(e){
    e.preventDefault();
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={(e)=>{form(e)}}>
          <input placeholder='Enter Todo here' onChange={updInpVal} value={inputValue} className='input' />
          {editUpdate ? <button onClick={addItem}>Add</button>
            : <button onClick={() => { updateItem() }}>Update</button>}
        </form>
        <ul>
          {List.map((item, index) => {
            return <li className={index == index1 ? 'highlight' : ''}>{item}
              <button onClick={() => { deleteItem(index) }}>Delete</button>
              <button onClick={() => { editItem(index) }}>Edit</button>
            </li>
          })}
        </ul>


        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>{text2}</h2>
        <button onClick={() => {
          text2 === 'Hello World' ? setText2('Hello Pakistan') : setText2('Hello World');
        }}>Change text</button>

        <img src={src} width='200px' height='200px' alt="logo" />

        <button back onClick={() => toggleOnOff(true)} >On</button>
        <button back onClick={() => toggleOnOff(false)} >OFF</button>

        <h3>{newText}</h3>
        <button onClick={reverseText}>Click me</button>

        <p>
          <ol>
            {memes.map((item) => {
              return <li>{item}</li>
            })}
          </ol>
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br />

        <table border='1px' width='600px'>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Color</th>
            <th>Features</th>
          </tr>
          {carsArr.map((item) => {
            return <tr>
              <td>{item.name}</td>
              <td>{item.model}</td>
              <td>{item.color}</td>

              <td>{item.features.map((feat) => {
                return <ul>
                  <li>{feat}</li>
                </ul>
              })}</td>
            </tr>
          })}
        </table>
        <br />

        <h4>{name}</h4>
        <br />

        <h3>{obj.name}</h3>
        <br />

        <h3>{data.map((item) => {
          return item + ' '
        })}</h3>
        <br />

        {list.map((item) => {
          return <h3>{item.name}</h3>
        })}
        <br />

        <table border='1px' width='600px'>
          <tr>
            <th>Company</th>
            <th>Jobs</th>
          </tr>
          {complex.map((item) => {
            return <tr>
              <td>{item.company}</td>
              <td>{item.jobs + ' '}</td>
            </tr>
          })}
        </table>
        <br />
      </header>
    </div>
  );
}

export default App;
