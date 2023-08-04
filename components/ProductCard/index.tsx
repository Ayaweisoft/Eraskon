import React from 'react'
import { IProduct } from '@/interfaces';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';

const ProductCard = ({ product, mode, handleEdit, handleDelete, handleClick }: { product: IProduct, mode: string, handleDelete?: Function, handleEdit?: Function, handleClick?: Function }) => {
    return (
        <>
            {handleClick ? (
                <div onClick={() => handleClick(product?._id)} className="h-80 w-full relative rounded-2xl parent overflow-hidden p-8 py-12 flex flex-col justify-center items-center gap-3">
                    <img src={product?.image} alt="" className="w-full h-full absolute object-cover" />
                    <div className="transition delay-100 ease-in-out w-full h-full child absolute bg-black opacity-80 hover:translate-x-[-100%] duration-300"></div>
                    <h2 className="transition delay-100 ease-in-out child-text text-3xl font-extrabold capitalize mb-3 z-20 text-gold">{product?.name}</h2>
                    {mode === 'admin' && handleDelete && handleEdit && (
                        <div className="flex gap-3 z-10">
                            <BiEdit onClick={() => handleEdit(product?._id)} size="1.2rem" className="cursor-pointer" />
                            <MdOutlineDelete onClick={() => handleDelete(product?._id)} size="1.2rem" className="text-red-400 cursor-pointer" />

                            {/* <button className="bg-primary text-white px-3 py-2 rounded-md" onClick={() => deleteProduct(product._id)}>Delete</button>
                            <button className="bg-primary text-white px-3 py-2 rounded-md">Edit</button> */}
                        </div>
                    )}
                </div>
            ) : (
                <div className="h-80 w-full relative rounded-2xl parent overflow-hidden p-8 py-12 flex flex-col justify-center items-center gap-3">
                    <img src={product?.image} alt="" className="w-full h-full absolute object-cover" />
                    <div className="transition delay-100 ease-in-out w-full h-full child absolute bg-black opacity-80 hover:translate-x-[-100%] duration-300"></div>
                    <h2 className="transition delay-100 ease-in-out child-text text-3xl font-extrabold capitalize mb-3 z-20 text-gold">{product?.name}</h2>
                    {mode === 'admin' && handleDelete && handleEdit && (
                        <div className="flex gap-3 z-10">
                            <BiEdit onClick={() => handleEdit(product?._id)} size="1.2rem" className="cursor-pointer" />
                            <MdOutlineDelete onClick={() => handleDelete(product?._id)} size="1.2rem" className="text-red-400 cursor-pointer" />

                            {/* <button className="bg-primary text-white px-3 py-2 rounded-md" onClick={() => deleteProduct(product._id)}>Delete</button>
                            <button className="bg-primary text-white px-3 py-2 rounded-md">Edit</button> */}
                        </div>
                    )}
                </div>
            )}

        </>
    )
}

export default ProductCard