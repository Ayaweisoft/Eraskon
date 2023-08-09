import React from 'react'
import { IProduct } from '@/interfaces';
import { BiEdit } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';

const ProductCard = ({ product, mode, handleEdit, handleDelete, handleClick }: { product: IProduct, mode: string, handleDelete?: Function, handleEdit?: Function, handleClick?: Function }) => {
    return (
        <>
            {handleClick ? (
                <div onClick={() => handleClick(product?._id)} className="relative flex flex-col items-center justify-center w-full gap-3 p-8 py-12 overflow-hidden h-80 rounded-2xl hover:cursor-pointer parent">
                    <img src={product?.image} alt="" className="absolute object-cover w-full h-full" />
                    <div className="transition delay-100 ease-in-out w-full h-full child absolute bg-black opacity-80 hover:translate-x-[-100%] duration-300"></div>
                    <h2 className="z-20 mb-3 text-3xl font-extrabold capitalize transition ease-in-out delay-100 child-text text-gold">{product?.name}</h2>
                    {mode === 'admin' && handleDelete && handleEdit && (
                        <div className="z-10 flex gap-3">
                            <BiEdit onClick={() => handleEdit(product?._id)} size="1.2rem" className="cursor-pointer" />
                            <MdOutlineDelete onClick={() => handleDelete(product?._id)} size="1.2rem" className="text-red-400 cursor-pointer" />

                            {/* <button className="px-3 py-2 text-white rounded-md bg-primary" onClick={() => deleteProduct(product._id)}>Delete</button>
                            <button className="px-3 py-2 text-white rounded-md bg-primary">Edit</button> */}
                        </div>
                    )}
                </div>
            ) : (
                <div className="relative flex flex-col items-center justify-center w-full gap-3 p-8 py-12 overflow-hidden h-80 rounded-2xl parent">
                    <img src={product?.image} alt="" className="absolute object-cover w-full h-full" />
                    <div className="transition delay-100 ease-in-out w-full h-full child absolute bg-black opacity-80 hover:translate-x-[-100%] duration-300"></div>
                    <h2 className="z-20 mb-3 text-3xl font-extrabold capitalize transition ease-in-out delay-100 child-text text-gold">{product?.name}</h2>
                    {mode === 'admin' && handleDelete && handleEdit && (
                        <div className="z-10 flex gap-3">
                            <BiEdit onClick={() => handleEdit(product?._id)} size="1.2rem" className="cursor-pointer" />
                            <MdOutlineDelete onClick={() => handleDelete(product?._id)} size="1.2rem" className="text-red-400 cursor-pointer" />

                            {/* <button className="px-3 py-2 text-white rounded-md bg-primary" onClick={() => deleteProduct(product._id)}>Delete</button>
                            <button className="px-3 py-2 text-white rounded-md bg-primary">Edit</button> */}
                        </div>
                    )}
                </div>
            )}

        </>
    )
}

export default ProductCard