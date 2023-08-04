import React from 'react'

const handlePageChange = (page: number, setPage: React.Dispatch<React.SetStateAction<number>>) => {
    setPage(page)
    window.scrollTo({
      top: 0,
      behavior: "smooth",
  });
}



export default handlePageChange