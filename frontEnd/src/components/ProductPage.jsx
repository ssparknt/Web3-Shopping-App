import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AddtoCart } from "../ReduxStore/features/CartSlicer";
import { CartIncremented } from "../ReduxStore/features/CartCounterSlicer";
import MinkLogo from "../assets/svg/ticonwhite.svg";

const ProductPage = () => {
  const { id, id2 } = useParams();

  let productDetails;
  if (id === "Tshirts") {
    productDetails = useSelector((state) =>
      state.Tshirts.find((key) => key.item === id2)
    );
  } else if (id === "Accessories") {
    productDetails = useSelector((state) =>
      state.Accessories.find((key) => key.item === id2)
    );
  } else if (id === "Watches") {
    productDetails = useSelector((state) =>
      state.Watches.find((key) => key.item === id2)
    );
  }

  const dispatch = useDispatch();

  const AddItemToCart = () => {
    dispatch(
      AddtoCart({
        name: productDetails.item,
        price: productDetails.price,
        image: productDetails.image,
      })
    );
  };

  const CartAddCounter = () => {
    dispatch(CartIncremented(1));
  };

  const mooninkprice = 0.328;

  return (
    <div className="p-5 flex flex-col md:flex-row">
      <img
        src={productDetails.image}
        alt={id2}
        className="rounded-2xl md:w-1/2 "
      />
      <div className="pt-7 pb-2 flex flex-col grow md:pl-10 md:pr-5 gap-7">
        <div className="flex md:flex-col md:gap-7 justify-between text-xl md:text-3xl">
          <p className="font-semibold">{`${productDetails.item}`}</p>
          <p className="flex items-center gap-4">
            {productDetails.price}
            <img className="w-7" src={MinkLogo} alt="MinkLogo" />
            <span className="text-slate-400">
              {`≈ $${Math.round(productDetails.price * mooninkprice)}`}
            </span>
          </p>
        </div>

        <button
          onClick={() => {
            AddItemToCart();
            CartAddCounter();
          }}
          className="w-full py-3 rounded-full ring-4 ring-violet-400/40 bg-violet-600 font-semibold hover:bg-violet-500 text-white text-xl active:ring-0 duration-200"
        >
          Add To Bag
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
