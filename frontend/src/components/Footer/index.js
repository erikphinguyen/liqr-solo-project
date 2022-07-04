import './index.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Footer() {

    return (
        <footer className='footer'>
            <ul>
                <li className='footer-list'>React</li>
                <li className='footer-list'>Redux</li>
                <li className='footer-list'>HTML</li>
                <li className='footer-list'>CSS</li>
                <li className='footer-list'>Sequelize</li>
                <li className='footer-list'>PostgreSQL</li>
                <li className='footer-list'>Express</li>
                <li className='footer-list'>Node</li>
                {/* <li className='fa-github-alt'>
                    <FontAwesomeIcon icon="fa-brands fa-github-alt" />
                </li>
                <li className='fa-linkedin'>
                    <FontAwesomeIcon icon="fa-brands fa-linkedin" />
                </li> */}
                <a className='footer-list' href='https://github.com/erikphinguyen/liqr-solo-project'>
                    <i className="fab fa-github-alt"></i>
                </a>
                <a className='footer-list' href='https://www.linkedin.com/in/erikphinguyen/'>
                    <i className="fab fa-linkedin"></i>
                </a>
            </ul>
        </footer>
    )
}

export default Footer;
