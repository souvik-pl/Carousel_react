import styles from "./App.module.css";
import Carousel from "./Carousel/Carousel";
import { CAROUSEL_IMAGES } from "./_shared/carousel_images";

function App() {

  return (
    <div className={styles.container}>
      <Carousel imageList={CAROUSEL_IMAGES} />
    </div>
  )
}

export default App;