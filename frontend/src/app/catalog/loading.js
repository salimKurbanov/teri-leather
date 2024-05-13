export default function Loading() {
    return (
        <div id="loader">
            <div class="loader_title">
                    Teri Leather
            </div>
            <div class="loader_container">
                <svg width="120" height="120">
                    <circle class="circle_main" cx="60" cy="60" r="45"></circle>
                    <circle class="circle_inherit" cx="60" cy="60" r="37"></circle>
                </svg>
            </div>
        </div>
    );
}