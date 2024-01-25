/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const HeroDraftedContainer = ({ type }) => {
    const getTypeBackground = (type) => {
        let background;
        if (type === "team") {
            background = `linear-gradient(to top, var(--green-01), var(--green-02))`;
        } else if (type === "enemy") {
            background = `linear-gradient(to top, var(--red-01), var(--red-02))`;
        } else if (type === "ban") {
            background = `linear-gradient(to top, var(--neutral-02), var(--locked-gray-01))`;
        }
        return background;
    };
    return (
        <div
            className={`${styles.container} ${
                type === "team"
                    ? styles.team
                    : type === "enemy"
                    ? styles.enemy
                    : ""
            }`}
        >
            <div className={styles.outerShadowContainer}>
                <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                        {/* <Image
                            // src should be a prop
                            src="/static/images/antimage.png"
                            alt="where's the hero image bro?"
                            width={90}
                            height={65}
                            className={`${styles.image} ${
                                type === "team"
                                    ? styles.teamImage
                                    : type === "enemy"
                                    ? styles.teamEnemy
                                    : ""
                            }`}
                        /> */}
                    </div>
                </div>
            </div>
            <div
                className={styles.draftColorContainer}
                style={
                    type ? { backgroundImage: getTypeBackground(type) } : null
                }
            ></div>
        </div>
    );
};

export default HeroDraftedContainer;
