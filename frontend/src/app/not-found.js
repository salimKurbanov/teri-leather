import Link from "next/link";
import './styles/not-found.scss';


const NotFound = () => {
    return (
        <div className="not-found">
            <h1 className="title">404</h1>
            <p className="not-found-message">Что то пошло не так...</p>
            <Link href={'/'} className="main_button">На главную</Link>
        </div>
    );
};

export default NotFound;