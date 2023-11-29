import { useEffect, useRef, useState } from "react";
import leftArrow from "../assets/left_arrow.svg";
import rightArrow from "../assets/right_arrow.svg";
import styles from "./Carousel.module.css";

type CarouselProps = {
    imageList: string[]
}

function Carousel(props: CarouselProps) {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const carouselContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            rightNavigationHandler();
        }, 2000);

        return () => clearInterval(interval);
    }, [carouselIndex]);

    function leftNavigationHandler() {
        if (carouselIndex === 0) {
            const newIndex = props.imageList.length - 1;
            setCarouselIndex(newIndex);
            const imageContainers = carouselContainerRef.current?.childNodes;
            imageContainers?.forEach((container: any) => {
                container.style.transform = `translateX(${-newIndex * 100}%)`;
            });
        }
        else {
            const imageContainers = carouselContainerRef.current?.childNodes;
            imageContainers?.forEach((container: any) => {
                container.style.transform = `translateX(${-(carouselIndex * 100) + 100}%)`;
            })
            setCarouselIndex(carouselIndex - 1);
        }
    }


    function rightNavigationHandler() {
        let newIndex: number;
        if (carouselIndex === (props.imageList.length - 1)) {
            newIndex = 0;
        }
        else {
            newIndex = carouselIndex + 1;
        }
        setCarouselIndex(newIndex);
        const imageContainers = carouselContainerRef.current?.childNodes;
        imageContainers?.forEach((container: any) => {
            container.style.transform = `translateX(${-newIndex * 100}%)`;
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper} ref={carouselContainerRef}>
                {
                    props.imageList.map((imageURL, index) => (
                        <div
                            key={imageURL}
                            className={styles.image_container}
                            style={{ left: `${index * 100}%` }}
                        >
                            <img className={styles.image} src={imageURL} />
                        </div>
                    ))
                }
            </div>

            <button
                onClick={leftNavigationHandler}
                className={`${styles.navigation} ${styles.left}`}
            >
                <img src={leftArrow} />
            </button>
            <button
                onClick={rightNavigationHandler}
                className={`${styles.navigation} ${styles.right}`}
            >
                <img src={rightArrow} />
            </button>
        </div>
    );
}

export default Carousel;
