import { MdOutlinePaid } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoMdDoneAll } from "react-icons/io";
import { GiShoppingBag } from "react-icons/gi";

const Statuses = ({ status }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      {status == "Paid" && <MdOutlinePaid size={34} color="green" />}
      {status == "In Progress" && <TbTruckDelivery size={34} color="#444343" />}
      {status == "Outside" && <GiShoppingBag size={34} color="#444343" />}
      {status == "Delivered" && <IoMdDoneAll size={34} color="green" />}
      <p>{status}</p>
    </div>
  );
};

export default Statuses;
