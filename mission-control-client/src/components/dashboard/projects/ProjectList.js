import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Project from "./Project";
import { connect } from "react-redux";
import { setActiveProduct } from '../../../actions/activeProductActions';

const ProjectList = props => {

  console.log(props)

  useEffect(() => {
    setFiltered({ products: props.products });

    if(filtered.products.length > 0) {
      props.setActiveProduct(filtered.products[0])
    } else {
      props.setActiveProduct(props.products[0])
    }
  }, [props.products]);

  const [filtered, setFiltered] = useState({ products: [] });


  const setProductHandler = el => {
    props.setActiveProduct(el);
  };

  const handleChange = e => {
    const products = props.products;
    const re = /^[a-z0-9\s]+$/i;

    if (e.target.value !== "" && re.test(e.target.value) && products.length > 0) {
      setFiltered({
        products: products.filter(item => {
          return (
            item.name
              .toLowerCase()
              .search(e.target.value.toLowerCase()) !== -1
          );
        })
      });
    } else if (!re.test(e.target.value) && e.target.value !== "") {
      setFiltered({ products: [] });
    } else {
      setFiltered({ products: props.products });
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <p className="product-list-title">Projects</p>
        <div className="add-product-icon">
          <AddCircleOutlineIcon fontSize="large" />
        </div>
      </div>
      <span className="admin-product-search-wrapper">
        <SearchIcon fontSize="large" className="admin-product-search-icon" />
        <input
          className="admin-product-search"
          placeholder="Search here"
          onChange={handleChange}
        />
      </span>
      <div className="products-scroll-container">
        {filtered.products.length &&
          filtered.products.map((el, i) => (
            <Project
              active={props.activeProductStore.active}
              setActiveProduct={setProductHandler}
              key={i}
              el={el}
              i={el.id}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    activeProductStore: state.activeProductStore
  }
}

export default connect(mapStateToProps, { setActiveProduct })(ProjectList);