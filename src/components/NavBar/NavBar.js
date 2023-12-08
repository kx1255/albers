import './NavBar.scss';

function NavBar() {
  return (
    <nav>
      <div className='Title'>Albers</div>
      <div className='Menu'>
        <div className='Menu-Entry'>
          <a href="/home">Color Theory</a>
        </div>
        <div className='Menu-Entry'>
          <a href="/how-to-use">Color Identification</a>
        </div>
        <div className='Menu-Entry'>
          <a href="/overview">Color in Use</a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

