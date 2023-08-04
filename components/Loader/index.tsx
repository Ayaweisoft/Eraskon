import React from 'react'

const Loader = ({ modalOpen }: { modalOpen: boolean}) => {
    
    React.useEffect(() => {
        if (modalOpen) {
          document.body.style.overflow = 'j'
        } else {
          document.body.style.overflow = 'auto'
        }
      }, [modalOpen])

    // const handleOutsideClick = (e) => {
    //     if (e.target === e.currentTarget) {
    //         closeModal()
    //     }
    // }

    // const closeModal = () => {
    //     setModalOpen(false)
    //     document.body.style.overflow = 'auto'
    // }
    
    

  return (
    <>
            <div className='backdrop-blur-[1px] bg-black/10 fixed top-0 left-0 w-full max-h-screen min-h-screen z-50 grid place-items-center overflow-hidden'>
                <div className='flex gap-12 h-8 w-8 rounded-full border-primary border-b-2 relative animate-[around_1s_linear_infinite] overflow-hidden'>
                </div>
            </div> 
    </>    
  )
}

export default Loader