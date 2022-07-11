import React from "react";
import StoreStyles from "./store.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Collapsible from "react-collapsible";

const Store = () => {
  return (
    <>
      <div className="py-5"></div>
      <div className={`container-fluid ${StoreStyles.store}`}>
        <span className={StoreStyles.storepath}>
          HOME {">"} SHOP {">"} ACCESSORIES
        </span>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div className={`${StoreStyles.shopsidebar}`}>
              <Collapsible trigger="Home & Kitchen">
                <ul>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                  <li>Hello</li>
                </ul>
              </Collapsible>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              {[0, 0, 0, 0, 0, 0, 0, 0].map(() => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-4 col-6">
                    <ProductCard />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
