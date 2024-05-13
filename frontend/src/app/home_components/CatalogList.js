import CatalogListItem from "./CatalogListItem";
import Api from "@/Api/Api";

async function getCategoriesList() {
    const res = await fetch(`${Api.url}api/product/get_categories/`)

    if (!res.ok) {
        return notFound()
    }

    return res.json()
}

export default async function CatalogList() {

    const listCatalog = await getCategoriesList()

    const catalog = listCatalog.slice(0, 4)

    return (
        <div className="catalog_list">

            {catalog.map((e, i) => (
                <CatalogListItem key={e.id} num={i} category={e}/>
            ))}

        </div>
    );
}