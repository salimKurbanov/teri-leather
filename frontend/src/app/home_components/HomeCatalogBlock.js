import Link from "next/link";

export default function HomeCatalogBlock() {
    return (
        <div className='catalog_home_block'>
            <div className="catalog_block"  id="catalog">
                <div className="catalog_block_item women">
                    <div className="catalog_block_item_title">
                        <Link href={`/catalog/new`} className="catalog_item_title_link women">Новинки</Link>
                        {/*<div className="navigation_block">
                            <a href="#" className="navigation_block_item women">кошельки</a>
                            <a href="#" className="navigation_block_item women">сумки</a>
                        </div>*/}
                    </div>
                </div>
                <div className="catalog_block_item men">
                    <div className="catalog_block_item_title">
                        <Link href={`/catalog/popular`} className="catalog_item_title_link men">Популярные</Link>
                        {/*<div className="navigation_block">
                            <a href="#" className="navigation_block_item men">картхолдеры</a>
                            <a href="#" className="navigation_block_item men">кошельки</a>
                            <a href="#" className="navigation_block_item men">ремни</a>
                            <a href="#" className="navigation_block_item men">сумки</a>
                        </div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}