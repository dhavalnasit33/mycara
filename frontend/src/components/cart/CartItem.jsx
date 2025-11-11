import remove from "../../assets/remove.png";
import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, fetchCart, updateCartItem } from "../../features/cart/cartThunk";
import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/helper";

export default function CartItem() {  
  const { items = [], loading ,deletingItemId } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    // ✅ Fetch cart when user logged in
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  if (loading) return <p>Loading cart...</p>;
  if (!items.length) return <p>Your cart is empty.</p>;


const handleIncrease = (item) => {
  const cart_id = localStorage.getItem("cart_id");
  const newQuantity = item.quantity + 1;
  dispatch(updateCartItem({ cart_id, item_id: item._id, quantity: newQuantity }))
    .unwrap()
    dispatch(fetchCart()); // refresh cart
};
const handleDecrease = (item) => {
  const cart_id = localStorage.getItem("cart_id");
  if (item.quantity > 1) {
    const newQuantity = item.quantity - 1;
    dispatch(updateCartItem({ cart_id, item_id: item._id, quantity: newQuantity }))
      .unwrap()
      dispatch(fetchCart());
  }
};

//remove cart
  const handleDelete = (item_id) => {
    const cart_id = localStorage.getItem("cart_id");
    if (!cart_id) return alert("No cart found!");
    dispatch(deleteCartItem({ cart_id, item_id }))
      .unwrap()
      .then(() => {
        dispatch(fetchCart());
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };


  return (
    <div className="w-full">
      {/* Desktop View */}
      <table className="w-full hidden custom-lg:table">
        <thead className="table-header-group">
          <tr className="border-b border-black font-18">
            <th></th>
            <th className="text-left pt-0 p-4 font-normal">Product Image</th>
            <th className="text-center pt-0 p-4 font-normal">Product Name</th>
            <th className="text-left pt-0 p-4 font-normal">Quantity</th>
            <th className="text-left pt-0 p-4 font-normal">Unit Price</th>
            <th className="text-center pt-0 p-4 font-normal">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b light-border font-18 sec-text-color">
              <td className="py-4 text-center">
                <button className="w-[20px] h-[20px]" onClick={() => handleDelete(item._id)}  >
                    <img src={remove} alt="remove" />
                </button>
              </td>
              <td className="p-4 w-[162px]">
                <Link to={`/products/${item.product_id?._id}`}>
                <img src={getImageUrl(item.product_id?.images?.[0])} 
                    alt={item.product_id?.name} className="box-shadow object-cover p-[5px]  w-[130px] h-[176px]" />
                </Link>
              </td>
              <td className="p-4 break  max-w-[230px] truncate overflow-hidden text-ellipsis">{item.product_id?.name}</td>
              <td className="p-4">
                <div className="inline-flex items-center gap-[10px] px-[8px] py-[5px] light-border border text-black rounded-[20px] leading">
                  <button onClick={() => handleDecrease(item)}>
                    <Minus size={14} />
                  </button>
                  <span>{item.quantity ?? 1}</span>

                  <button onClick={() => handleIncrease(item)}>
                    <Plus size={14} />
                  </button>
                </div>
              </td>
              <td className="p-4 text-left">₹{item.variant_id?.price} * {item.quantity}</td>
              <td className="p-4 text-center">₹ {(item.variant_id?.price || 0)*(item.quantity || 1)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="custom-lg:hidden space-y-[20px]">
        {items.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-[5px] box-shadow relative flex sm:flex-nowrap gap-[20px] items-start">
            <div className="flex items-center gap-[10px] flex-shrink-0">
                <button className="w-[10px] h-[10px] flex items-center justify-center" onClick={() => handleDelete(item._id)} >
                  <img src={remove}  alt="remove" className="w-full h-full object-contain" />
                </button>
                <Link to={`/products/${item.product_id?._id}`}>
                  <img src={getImageUrl(item.product_id?.images?.[0])} alt={item.product_id?.name} className="box-shadow object-cover p-[5px] h-[110px] sm:h-[109px] w-[90px] sm:w-[87px] " />
                </Link>
            </div>
            <div className="flex flex-col  flex-wrap ">
                <div className="mb-[8px] text-14 break ">{item.product_id?.name}</div>
                <div className="text-p mb-[12px] text-color">₹{(item.variant_id?.price || 0) * (item.quantity || 1)}</div>

                <div className="flex items-center gap-[10px] text-14">
                <button className="light-color rounded-[2px] flex items-center justify-center p-[2px] ">
                    <Minus size={12} onClick={() => handleDecrease(item)} />
                </button>
                <span>{item.quantity}</span>
                <button className="bg-color-100 rounded-[2px] flex items-center justify-center p-[2px] text-white">
                    <Plus size={12} onClick={() => handleIncrease(item)}/>
                </button>
                </div>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}
