import { Link } from "react-router-dom";
import "./Brand.scss";
import { InView } from "react-intersection-observer";
import { v4 } from "uuid";
const BrandConponent = (props) => {
  return (
    <InView key={v4()}>
      {({ inView, ref, entry }) => (
        <Link
          className={`Brand ${inView ? "active" : ""}`}
          ref={ref}
          to={`/brand/${props?.value?.slug}`}
        >
          <div className="Label">
            <img
              loading="lazy"
              src={
                props?.url ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png"
              }
            />
          </div>
        </Link>
      )}
    </InView>
  );
};

export default BrandConponent;
