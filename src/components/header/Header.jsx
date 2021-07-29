import "./header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerSm">Style Blog</span>
                <span className="headerLg">Web Blog</span>
            </div>
            <img src="https://images.pexels.com/photos/2739013/pexels-photo-2739013.jpeg?cs=srgb&dl=pexels-mads-thomsen-2739013.jpg&fm=jpg" alt="header" className="headerImage" />
        </div>
    )
}

export default Header
