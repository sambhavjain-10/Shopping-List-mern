import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { getItems, deleteItem, addItem } from "../actions/itemActions";
import Status from "./Status";

function ShoppingList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleOpenModal = () => setModal(true);
  const handleCloseModal = () => setModal(false);

  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({ name: "" });
  const [active, setaActive] = useState(false);
  const [action, setAction] = useState("");

  const addItemClick = () => {
    dispatch(addItem(item));
    handleCloseModal();
    setItem({ name: "" });
    setAction("ADDED");
    setaActive(true);
    setTimeout(() => {
      setaActive(false);
    }, 3000);
  };

  const deleteItemClick = id => {
    dispatch(deleteItem(id));
    setAction("DELETED");
    setaActive(true);
    setTimeout(() => {
      setaActive(false);
    }, 3000);
  };

  const items = useSelector(state => state.item.items);
  const loading = useSelector(state => state.item.loading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <>
      <div className="items-c">
        {isAuthenticated ? (
          <button onClick={handleOpenModal} className="add-item">
            + Add Item
          </button>
        ) : (
          <span>you need to log in to edit</span>
        )}
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          items.map(item => {
            return (
              <div key={item._id}>
                <span>{item.name}</span>
                {isAuthenticated && (
                  <button onClick={() => deleteItemClick(item._id)}>
                    <i class="fas fa-trash-alt"></i>
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
      <ReactModal
        isOpen={modal}
        contentLabel="Minimal Modal Example"
        className="modal"
        overlayClassName="overlay"
      >
        <form>
          <h3>ADD ITEM</h3>
          <input
            type="text"
            name="item"
            value={item.name}
            onChange={e => setItem({ name: e.target.value })}
            placeholder="item name"
          />
          <input
            disabled={item.name ? false : true}
            type="submit"
            value="ADD +"
            onClick={addItemClick}
          />
          <button className="close" onClick={handleCloseModal}>
            <i class="fas fa-times"></i>
          </button>
        </form>
      </ReactModal>
      <Status action={action} active={active} />
    </>
  );
}

export default ShoppingList;
