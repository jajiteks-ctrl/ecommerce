import "./Home.css";
import heroBannerTwo from "../image/heroBannerTwo.png";

const Home = () => {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">
          <h1>Discover Your Perfect Style</h1>

          <p>
            Shop the latest fashion, electronics, shoes and accessories
            at unbeatable prices. Explore thousands of premium products
            with exciting offers and fast delivery.
          </p>

          <button>Shop Now</button>
        </div>

        <div className="hero-image">
          <img src={heroBannerTwo} alt="Shopping Banner" />
        </div>

      </section>

      {/* Categories */}

      <section className="categories">

        <h2>Shop by Category</h2>

        <div className="category-container">

          <div className="category-card">
            <img
              src="https://picsum.photos/250?random=1"
              alt="Electronics"
            />
            <h3>Electronics</h3>
          </div>

          <div className="category-card">
            <img
              src="https://picsum.photos/250?random=2"
              alt="Fashion"
            />
            <h3>Fashion</h3>
          </div>

          <div className="category-card">
            <img
              src="https://picsum.photos/250?random=3"
              alt="Shoes"
            />
            <h3>Shoes</h3>
          </div>

          <div className="category-card">
            <img
              src="https://picsum.photos/250?random=4"
              alt="Accessories"
            />
            <h3>Accessories</h3>
          </div>

        </div>

      </section>

      {/* Featured Products */}

      <section className="featured">

        <h2>Featured Products</h2>

        <div className="product-container">

          {[1, 2, 3, 4].map((item) => (
            <div className="product-card" key={item}>

              <img
                src={`https://picsum.photos/250?random=${item + 10}`}
                alt="Product"
              />

              <h3>Product {item}</h3>

              <p>$99.99</p>

              <button>Add to Cart</button>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
};

export default Home;