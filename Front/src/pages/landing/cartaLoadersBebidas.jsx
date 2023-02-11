import React,{useState,useEffect} from 'react';
import SectionProduct from '../../components/containers/sectionProduct';
const CartaLoadersBebidas = ({ categories }) => {

    useEffect(() => {
        if (categories) {
            seeMoreArray(categories)
        }
    }, [])

    let array = []

    const [seeMore, setSeeMore] = useState([]);

    function seeMoreFunction(keyProduct, product) {
        seeMore.forEach((elementMore, keySee) => {
            if (elementMore.id === product._id) {
                array.push({ id: product._id, valor: !elementMore.valor })
            } else {
                array.push({ id: elementMore.id, valor: false })
            }
        })
        setSeeMore(array)
    }

    function seeMoreArray(categories) {
        setTimeout(() => {
            categories.map((category) => {
                category.products.forEach((element, key) => {
                    array.push({ id: element._id, valor: false })
                });
            })
            setSeeMore(array)
        }, 1000)
    }


    return (
        <div >
            {
                categories.map((category) => {
                    return ((
                        !category.isFood ? <SectionProduct category={category} seeMoreFunction={seeMoreFunction} seeMore={seeMore}></SectionProduct> : <></>
                    ))
                })
            }

        </div>
    );
}

export default CartaLoadersBebidas;
