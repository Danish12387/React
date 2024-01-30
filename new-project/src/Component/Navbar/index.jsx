function Navbar({func}) {
    // const { func } = props;

    function clickMe() {
        const prmpt = prompt('Enter Your Name!');
        func(prmpt);
    };

    return (
        <div>
            <button onClick={clickMe}>Click Me!</button>
        </div>
    )
};

export default Navbar;