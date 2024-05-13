import Api from "@/Api/Api"
import SimilarSplider from "./SimilarSplider"


async function getSimilar(id) {

    const res = await fetch(`${Api.url}api/product/get_similar/${id}`)

    if (!res.ok) {
        return notFound()
    }

    return res.json()
}

export default async function SimilarList({id}) {

    const similar = await getSimilar(id)

    return (
        <>
        {similar.length > 0 && 
            <div className="similar_block">
                <h3 className="pre_title">Может понравится</h3>
                <SimilarSplider similar={similar}/>
            </div>
        }
        </>
    );
}