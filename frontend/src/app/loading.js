export default function Loading() {
    return (
        <div id="loader">
            <div className="loader_title">
                    Teri Leather
            </div>
            <div className="loader_container">
                <svg width="120" height="120">
                    <circle className="circle_main" cx="60" cy="60" r="45"></circle>
                    <circle className="circle_inherit" cx="60" cy="60" r="37"></circle>
                </svg>
            </div>
        </div>
    );
}