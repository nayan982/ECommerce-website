import { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const Filter = () => {
    const API_URL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();
    const location = useLocation();
    const { getProduct, productData } = useContext(ProductContext);

    const [Brandname, setBrandname] = useState([])
    const [brandsName, setbrandsName] = useState([]);
    const [searchParams] = useSearchParams();
    const categoryCurrent = useRef("")

    // const category = searchParams.get('category') || "";
    // const selectedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    // Get category from URL
    const getCategoryFromURL = () => {
        const params = new URLSearchParams(location.search);
        return params.get("category") || "";
    };
    const category = getCategoryFromURL();
    const selectedCategory = category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : "";

    const fetchBrands = async () => {
        try {

            const res = await fetch(`${API_URL}/products/getbrand?category=${category}`);
            const data = await res.json();
            const cleanedBrands = data.brandName
                .map(obj => obj.brandName?.trim().toLowerCase()) // safely access name
                .filter(Boolean); // remove undefined/null

            const uniqueBrands = [...new Set(cleanedBrands)];

            const formattedBrands = uniqueBrands.map(name => ({
                raw: name, // safe lowercase version for backend query
                label: name.charAt(0).toUpperCase() + name.slice(1) // pretty UI version
            }));

            setbrandsName(formattedBrands);
            // console.log(uniqueBrands)
            // console.log(data.brandName)
        } catch (error) {
            toast.error("Something went wrong");
            // console.error("brand frontend error: ", error);

        }
    }

    const filter = async (e) => {
        const brand = e.target.name;
        const isChecked = e.target.checked;
        // const params = new URLSearchParams(location.search);
        // const category = params.get("category") || "";
        const currentCategory = getCategoryFromURL();
        let newBrandList = Brandname;

        if (isChecked) {
            // If category changed, reset list
            if (categoryCurrent.current && categoryCurrent.current !== currentCategory) {
                newBrandList = [brand];
            } else {
                newBrandList = [...new Set([...Brandname, brand])]; // avoid duplicates
            }
            categoryCurrent.current = currentCategory;
        } else {
            newBrandList = Brandname.filter(b => b !== brand);
        }

        setBrandname(newBrandList);

        // const queryString = new URLSearchParams({
        //     category,
        //     brandName: newBrandList.join(","),
        // }).toString();
        const query = new URLSearchParams();
        query.append("category", currentCategory);

        if (newBrandList.length) {
            query.append("brandName", newBrandList.join(","));
        }
        navigate(`/products?${query.toString()}`);
        // await getProduct({ category:currentCategory, brandName: newBrandList });
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        // const category = params.get("category") || "";
        const brandName = params.get("brandName")?.split(",") || [];

        // Restore state
        setBrandname(brandName);
        // Fetch products immediately
        getProduct({ category, brandName });
        fetchBrands();
    }, [location.search]);

    return (
        <>

            <div className='bg-white w-[250px] p-6 min-h-full'>
                <div className='mb-4 font-bold '>Filter</div>
                <div>
                    <div>
                        <label htmlFor="category">Category</label>
                    </div>
                    <div className='text-[14px] pl-2 pt-1'>{selectedCategory}</div>
                </div>
                <div>
                    <div className='mt-4 mb-1.5'>
                        <label htmlFor="brand">Brand</label>
                    </div>

                    {brandsName?.map(b => {
                        return (
                            <div key={b.raw}>
                                <input type="checkbox" name={b.raw} id={b.raw} checked={Brandname.includes(b.raw)} onChange={filter} />
                                <label htmlFor={b.raw} className='ml-1'>{b.label}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Filter



