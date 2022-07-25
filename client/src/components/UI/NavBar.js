import './NavBar.css';

const NavBar = () => {
  const getStreamKeyHandler = async () => {
    const response = await fetch('http://127.0.0.1:8080/stream_key');
    const data = await response.json();
    alert('Stream key: ' + data['stream_key']);
  };

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <div>Media Streaming Service</div>
        <div className="live" onClick={getStreamKeyHandler}>
          Go Live
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
