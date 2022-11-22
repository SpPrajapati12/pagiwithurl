import './App.css';
import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import axios from 'axios';



function App() {

  const [state, setState] = useState({
    offset: 0,
    data: [],
    perPage: 10,
    currentPage: 0,
    pageCount : 0,
  })

  useEffect(() => {
    receivedData()
  },[state.currentPage])


  const receivedData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/photos`).then((res) => {
      const data = res.data;
      const slice = data.slice(
        state.offset,
        state.offset + state.perPage
      );
      const postData = slice.map((pd, index) => (
        <div key={index}>
          <p>{pd.title}</p>
          <img src={pd.thumbnailUrl} alt="" />
        </div>
      ));
      setState({...state,pageCount: Math.ceil(data.length / state.perPage),postData});
    });
  }

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * state.perPage;

    setState({...state,currentPage: selectedPage,offset: offset});
  };

  return (
    <div className="App">
        {state.postData}
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
    </div>
  );
}

export default App;

